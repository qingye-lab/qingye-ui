import { buttonVariants } from "@qingye/ui/components/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDocsLocale } from "@/lib/docs-locale";
import { languageSwitchTarget, languageTag } from "@/lib/paths";

export function LanguageSwitch() {
  const locale = useDocsLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const next = locale === "en" ? "zh" : "en";
  return <Link
    className={buttonVariants({ size: "sm", variant: "quiet" })}
    data-language-switch
    hrefLang={languageTag(next)}
    lang={languageTag(next)}
    onClick={(event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(languageSwitchTarget(location, next), { state: { ...location.state, localeSwitchScroll: window.scrollY } });
    }}
    to={languageSwitchTarget(location, next)}
  >{next === "en" ? "EN" : "中文"}</Link>;
}
