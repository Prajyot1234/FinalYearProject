import mapLanguageToExtension from '../assets/mapLanguageToExtensions.json';

export default (code, language) => {
    const filename = "source_code." + mapLanguageToExtension[language];
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(blob);
}