export function toStr(e) {
    const res = [];
    let key;
    if (/CONTROL|SHIFT|ALT/i.test(e.key)) return;
    if (e.ctrlKey) res.push('Control');
    if (e.shiftKey) res.push('Shift');
    if (e.altKey) res.push('Alt');
    // ここに矢印キーとかを追加
    if (!key || e.key.length === 1) { key = e.key.toUpperCase(); }
    if (!key) return;
    res.push(key);
    return res.join('+');
}