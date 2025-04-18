import React from 'react';
import * as uui from '@epam/uui';
import * as promo from '@epam/promo';
import * as loveship from '@epam/loveship';
import * as electric from '@epam/electric';
import { DocBuilder, DocPreviewBuilder, TDocConfig, TSkin } from '@epam/uui-docs';
import { BaseDocsBlock, DocExample, EditableDocContent } from '../../common';
import { childrenUui } from './dropdownContainerExamples';
import { TDropdownContainerPreview } from '../_types/previewIds';

export class DropdownContainerDoc extends BaseDocsBlock {
    title = 'Dropdown Container';

    static override config: TDocConfig = {
        name: 'DropdownContainer',
        bySkin: {
            [TSkin.Loveship]: {
                type: '@epam/uui:DropdownContainerProps',
                component: loveship.DropdownContainer,
            },
            [TSkin.Promo]: {
                type: '@epam/uui:DropdownContainerProps',
                component: promo.DropdownContainer,
            },
            [TSkin.UUI]: {
                type: '@epam/uui:DropdownContainerProps',
                component: uui.DropdownContainer,
            },
            [TSkin.Electric]: {
                type: '@epam/uui:DropdownContainerProps',
                component: electric.DropdownContainer,
            },
        },
        doc: (doc: DocBuilder<uui.DropdownContainerProps>) => {
            doc.merge('children', { examples: childrenUui });
            doc.merge('as', { editorType: 'MultiUnknownEditor', examples: ['span', 'b', 'i', 'p'] });
            doc.merge('shards', { editorType: 'JsonEditor' });
            doc.merge('focusLock', { examples: [{ value: false, isDefault: true }, true] });
            doc.merge('width', { examples: ['auto', 100, 500], editorType: 'NumEditor' });
            doc.merge('maxWidth', { examples: ['auto', 100, 500], editorType: 'NumEditor' });
            doc.merge('maxHeight', { examples: ['auto', 100, 500], editorType: 'NumEditor' });
            doc.merge('lockProps', { editorType: 'JsonEditor' });
            doc.merge('returnFocus', { examples: [{ value: true, isDefault: true }, false] });
            doc.merge('arrowProps', {
                editorType: 'MultiUnknownEditor',
                examples: [{ name: '{ ref: { current: null }, style: {} }', value: { ref: { current: null }, style: {} } }],
            });
        },
        preview: (docPreview: DocPreviewBuilder<uui.DropdownContainerProps>) => {
            const TEST_DATA = {
                children: (<uui.Text>Test</uui.Text>),
            };
            docPreview.add({
                id: TDropdownContainerPreview['Size Variants'],
                matrix: [
                    {
                        children: { values: [TEST_DATA.children] },
                        padding: { examples: '*' },
                    },
                    {
                        children: { values: [TEST_DATA.children] },
                        vPadding: { examples: '*' },
                    },
                ],
                cellSize: '180-110',
            });
        },
    };

    renderContent() {
        return (
            <>
                <EditableDocContent fileName="dropdownContainer-descriptions" />
                {this.renderSectionTitle('Examples')}
                <DocExample title="Basic" path="./_examples/dropdownContainer/Basic.example.tsx" />
                <DocExample title="Focus lock and keyboard navigation" path="./_examples/dropdownContainer/FocusLockAndKeyboardNavigation.example.tsx" />
            </>
        );
    }
}
