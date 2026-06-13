import { PDFJS_CDN_BASE, RESUME_PATH } from "./chat.constants";

// types for cdn-loaded pdf.js
interface PdfjsTextItem {
	str: string;
}
interface PdfjsTextContent {
	items: PdfjsTextItem[];
}
interface PdfjsPage {
	getTextContent(): Promise<PdfjsTextContent>;
}
interface PdfjsDocument {
	numPages: number;
	getPage(pageNumber: number): Promise<PdfjsPage>;
}
interface PdfjsLib {
	GlobalWorkerOptions: { workerSrc: string };
	getDocument(params: { data: ArrayBuffer }): {
		promise: Promise<PdfjsDocument>;
	};
}

// cache to avoid re-fetching pdf text
let resumeTextCache: string | null = null;
let resumeLoadPromise: Promise<string> | null = null;

export async function loadResumeText(): Promise<string> {
	if (resumeTextCache) return resumeTextCache;
	if (resumeLoadPromise) return resumeLoadPromise;

	resumeLoadPromise = (async () => {
		try {
			const pdfjsLib: PdfjsLib = await import(
				/* @vite-ignore */ `${PDFJS_CDN_BASE}/pdf.min.mjs`
			);

			pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN_BASE}/pdf.worker.min.mjs`;

			const res = await fetch(RESUME_PATH);
			if (!res.ok) throw new Error(`Resume fetch failed: ${res.status}`);
			const buf = await res.arrayBuffer();
			const pdf = await pdfjsLib.getDocument({ data: buf }).promise;

			const pages = await Promise.all(
				Array.from({ length: pdf.numPages }, (_, i) =>
					pdf
						.getPage(i + 1)
						.then((page) =>
							page
								.getTextContent()
								.then((content) =>
									content.items.map((item) => item.str).join(" "),
								),
						),
				),
			);

			resumeTextCache = pages.join("\n");
			return resumeTextCache;
		} catch {
			resumeTextCache = "RESUME_LOAD_FAILED";
			return resumeTextCache;
		}
	})();

	return resumeLoadPromise;
}