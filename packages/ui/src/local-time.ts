/*
 * 无时区的时刻文本，与 HTML 有效时间字符串同形：`HH:mm`、`HH:mm:ss`，秒后可带 1–3 位小数。
 * TimeField 与 DateTimePicker 共用这一个判定与比较，同一段文本在两处要么都收、要么都拒。
 */
export const validLocalTime = (text: string) => /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?$/.test(text);

/** 精度不同的两段时刻放在一起比较时补齐到毫秒（`34.5` 与 `34.500` 相等），之后可按字典序比。 */
export function comparableTime(text: string) {
  const [clock = "", fraction = ""] = text.split(".");
  return `${clock.length === 5 ? `${clock}:00` : clock}.${fraction.padEnd(3, "0")}`;
}
