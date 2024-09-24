import React, { useCallback, useMemo } from 'react';
import { PreviewContent } from './previewContent/previewContent';
import { TPreviewContentParams } from './types';
import { usePlayWrightInterface } from './hooks/usePlayWrightInterface';
import { usePreviewPageBg } from './hooks/usePreviewPageBg';
import { usePreviewParams } from './hooks/usePreviewParams';
import { svc } from '../services';
import { BuiltInTheme } from '../data';
import { formatPreviewIdToString } from './utils/previewLinkUtils';

export function PreviewPage() {
    const params = usePreviewParams();
    const theme = params.theme;
    const isSkin = params.isSkin || false;
    const componentId = params.componentId;
    const previewId = params.previewId;

    const currentParams: TPreviewContentParams = useMemo(() => {
        return {
            theme,
            isSkin,
            componentId,
            previewId,
        };
    }, [
        theme,
        isSkin,
        componentId,
        previewId,
    ]);

    const handleNavPreview = useCallback((newParams: TPreviewContentParams) => {
        svc.uuiRouter.redirect({
            pathname: '/preview',
            query: {
                theme: newParams.theme || BuiltInTheme.promo,
                isSkin: newParams.isSkin ?? true,
                componentId: newParams.componentId,
                previewId: formatPreviewIdToString(newParams.previewId),
            },
        });
    }, []);

    usePlayWrightInterface<TPreviewContentParams>(handleNavPreview);
    usePreviewPageBg();

    const key = `${theme}_${isSkin}_${componentId}_${previewId}`;
    return <PreviewContent key={ key } params={ currentParams } />;
}
