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
declare global {
	interface Window {
		pdfjsLib: PdfjsLib | undefined;
	}
}

// cache to avoid re-fetching pdf text
let resumeTextCache: string | null = null;
let resumeLoadPromise: Promise<string> | null = null;

function loadScript(src: string): Promise<void> {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) {
			resolve();
			return;
		}
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error(`Failed to load ${src}`));
		document.head.appendChild(script);
	});
}

export async function loadResumeText(): Promise<string> {
	if (resumeTextCache) return resumeTextCache;
	if (resumeLoadPromise) return resumeLoadPromise;

	resumeLoadPromise = (async () => {
		try {
			// avoid bundling pdf.js, load from cdn and wire worker same way
			await loadScript(`${PDFJS_CDN_BASE}/pdf.min.mjs`);

			const pdfjsLib = window.pdfjsLib;
			if (!pdfjsLib)
				throw new Error("pdfjsLib not available after script load");

			pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN_BASE}/pdf.worker.min.mjs`;

			const res = await fetch(RESUME_PATH);
			const buf = await res.arrayBuffer();
			const pdf = await pdfjsLib.getDocument({ data: buf }).promise;

			const pages = await Promise.all(
				Array.from({ length: pdf.numPages }, (_, i) =>
					pdf
						.getPage(i + 1)
						.then((page: PdfjsPage) =>
							page
								.getTextContent()
								.then((content: PdfjsTextContent) =>
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