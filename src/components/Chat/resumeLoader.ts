import { RESUME_PATH } from "./chat.constants";

let resumeTextCache: string | null = null;
let resumeLoadPromise: Promise<string> | null = null;

export async function loadResumeText(): Promise<string> {
	if (resumeTextCache) return resumeTextCache;
	if (resumeLoadPromise) return resumeLoadPromise;

	resumeLoadPromise = (async () => {
		try {
			const pdfjsLib =
				await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs");
			pdfjsLib.GlobalWorkerOptions.workerSrc =
				"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

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