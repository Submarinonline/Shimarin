export function toElectronAccelerator(e) {
    const res = [];
    let key;
    if (/CONTROL|SHIFT|ALT/i.test(e.key)) return;
    if (e.ctrlKey) res.push('Control');
    if (e.shiftKey) res.push('Shift');
    if (e.altKey) res.push('Alt');
    // ここに矢印キーとかを追加
    console.log(e.key);
    if (/^[A-Z]$/i.test(e.key)) { key = e.key.toUpperCase(); }
    if (/^[0-9]$/i.test(e.key)) { key = e.key; }

    if (!key) return;
    res.push(key);
    return res.join('+');
}