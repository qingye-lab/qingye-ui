import { r as reactExports, V as formatErrorMessage, Y as useRenderElement, j as jsxRuntimeExports, a3 as useIsoLayoutEffect, ab as NOOP, ac as useTransitionStatus, X as useStableCallback, ad as useOpenChangeComplete, _ as transitionStatusMapping, ae as useTimeout, e as cn } from "./index-DM02Iz28.js";
const AvatarRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useAvatarRootContext() {
  const context = reactExports.useContext(AvatarRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(13));
  }
  return context;
}
const avatarStateAttributesMapping = {
  imageLoadingStatus: () => null
};
const AvatarRoot = /* @__PURE__ */ reactExports.forwardRef(function AvatarRoot2(componentProps, forwardedRef) {
  const {
    className,
    render,
    style,
    ...elementProps
  } = componentProps;
  const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
  const state = {
    imageLoadingStatus
  };
  const contextValue = reactExports.useMemo(() => ({
    imageLoadingStatus,
    setImageLoadingStatus
  }), [imageLoadingStatus, setImageLoadingStatus]);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: avatarStateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
function useImageLoadingStatus(src, {
  referrerPolicy,
  crossOrigin,
  sizes,
  srcSet
}) {
  const [loadingStatus, setLoadingStatus] = reactExports.useState("idle");
  useIsoLayoutEffect(() => {
    if (!src && !srcSet) {
      setLoadingStatus("error");
      return NOOP;
    }
    let isMounted = true;
    const image = new window.Image();
    const updateStatus = (status) => () => {
      if (!isMounted) {
        return;
      }
      setLoadingStatus(status);
    };
    setLoadingStatus("loading");
    image.onload = updateStatus("loaded");
    image.onerror = updateStatus("error");
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    image.crossOrigin = crossOrigin ?? null;
    if (sizes) {
      image.sizes = sizes;
    }
    if (srcSet) {
      image.srcset = srcSet;
    }
    if (src) {
      image.src = src;
    }
    if (image.complete) {
      setLoadingStatus(image.naturalWidth > 0 ? "loaded" : "error");
    }
    return () => {
      isMounted = false;
    };
  }, [src, srcSet, sizes, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
const stateAttributesMapping = {
  ...avatarStateAttributesMapping,
  ...transitionStatusMapping
};
const AvatarImage$1 = /* @__PURE__ */ reactExports.forwardRef(function AvatarImage2(componentProps, forwardedRef) {
  const {
    className,
    render,
    onLoadingStatusChange: onLoadingStatusChangeProp,
    style,
    ...elementProps
  } = componentProps;
  const {
    setImageLoadingStatus
  } = useAvatarRootContext();
  const imageLoadingStatus = useImageLoadingStatus(elementProps.src, elementProps);
  const isVisible = imageLoadingStatus === "loaded";
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(isVisible);
  const imageRef = reactExports.useRef(null);
  const handleLoadingStatusChange = useStableCallback((status) => {
    onLoadingStatusChangeProp?.(status);
    setImageLoadingStatus(status);
  });
  useIsoLayoutEffect(() => {
    if (imageLoadingStatus !== "idle") {
      handleLoadingStatusChange(imageLoadingStatus);
    }
  }, [imageLoadingStatus, handleLoadingStatusChange]);
  useIsoLayoutEffect(() => {
    return () => setImageLoadingStatus("idle");
  }, [setImageLoadingStatus]);
  useOpenChangeComplete({
    open: isVisible,
    ref: imageRef,
    onComplete() {
      if (!isVisible) {
        setMounted(false);
      }
    }
  });
  const state = {
    imageLoadingStatus,
    transitionStatus
  };
  const element = useRenderElement("img", componentProps, {
    state,
    ref: [forwardedRef, imageRef],
    props: elementProps,
    stateAttributesMapping,
    enabled: mounted
  });
  if (!mounted) {
    return null;
  }
  return element;
});
const AvatarFallback$1 = /* @__PURE__ */ reactExports.forwardRef(function AvatarFallback2(componentProps, forwardedRef) {
  const {
    className,
    render,
    delay = 0,
    style,
    ...elementProps
  } = componentProps;
  const {
    imageLoadingStatus
  } = useAvatarRootContext();
  const [delayPassed, setDelayPassed] = reactExports.useState(delay === 0);
  const timeout = useTimeout();
  reactExports.useEffect(() => {
    if (delay > 0) {
      timeout.start(delay, () => setDelayPassed(true));
    } else {
      setDelayPassed(true);
    }
    return timeout.clear;
  }, [timeout, delay]);
  const state = {
    imageLoadingStatus
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: avatarStateAttributesMapping,
    enabled: imageLoadingStatus !== "loaded" && (delay === 0 || delayPassed)
  });
  return element;
});
const avatarSizeClassNames = {
  xs: "size-5 text-[0.625rem]",
  sm: "size-6 text-[0.6875rem]",
  default: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-12 text-base"
};
function Avatar({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AvatarRoot,
    {
      className: cn(
        "group/avatar relative isolate inline-flex shrink-0 select-none items-center justify-center rounded-full bg-background align-middle font-medium",
        // A hairline inside the edge keeps light images from bleeding into the page.
        "after:pointer-events-none after:absolute after:inset-0 after:z-20 after:rounded-full after:border after:border-foreground/8",
        avatarSizeClassNames[size],
        className
      ),
      "data-size": size,
      "data-slot": "avatar",
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AvatarImage$1,
    {
      className: cn(
        "absolute inset-0 z-10 size-full rounded-full object-cover data-error:invisible data-loading:invisible",
        className
      ),
      "data-slot": "avatar-image",
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AvatarFallback$1,
    {
      className: cn(
        "absolute inset-0 flex size-full items-center justify-center rounded-full bg-muted",
        className
      ),
      "data-slot": "avatar-fallback",
      ...props
    }
  );
}
function AvatarBadge({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "absolute end-0 bottom-0 z-30 inline-flex size-2.5 items-center justify-center rounded-full bg-success ring-2 ring-background group-data-[size=lg]/avatar:size-3 group-data-[size=xl]/avatar:size-3.5 group-data-[size=xs]/avatar:size-1.5 group-data-[size=sm]/avatar:size-2 [&_svg]:size-2",
        className
      ),
      "data-slot": "avatar-badge",
      ...props
    }
  );
}
function AvatarGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "group/avatar-group flex items-center -space-x-1.5 has-data-[size=lg]:-space-x-2 has-data-[size=xl]:-space-x-2.5 has-data-[size=xs]:-space-x-1 has-data-[size=sm]:-space-x-1 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      ),
      "data-slot": "avatar-group",
      ...props
    }
  );
}
function AvatarGroupCount({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "relative inline-flex size-8 min-w-fit shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-background),var(--color-foreground)_6%)] px-1 font-medium text-muted-foreground text-xs ring-2 ring-background numeric",
        // Matches the size of the avatars it follows.
        "group-has-data-[size=xs]/avatar-group:size-5 group-has-data-[size=xs]/avatar-group:text-[0.625rem] group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:text-[0.6875rem] group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=lg]/avatar-group:text-sm group-has-data-[size=xl]/avatar-group:size-12 group-has-data-[size=xl]/avatar-group:text-base",
        className
      ),
      "data-slot": "avatar-group-count",
      ...props
    }
  );
}
export {
  Avatar as A,
  AvatarFallback as a,
  AvatarImage as b,
  AvatarBadge as c,
  AvatarGroup as d,
  AvatarGroupCount as e
};
