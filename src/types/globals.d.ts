import { IChartingLibraryWidget } from 'public/charting_library/charting_library.d.ts';

declare global {
    interface Window {
        TradingView: IChartingLibraryWidget; // Replace `any` with the actual type if available
    }
}

// Exporting an empty object to make this a module
export {};
