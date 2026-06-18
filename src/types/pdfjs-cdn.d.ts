declare module "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs" {
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

	export const GlobalWorkerOptions: { workerSrc: string };
	export function getDocument(params: { data: ArrayBuffer }): {
		promise: Promise<PdfjsDocument>;
	};
}