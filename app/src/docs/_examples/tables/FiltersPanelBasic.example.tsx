import React, { useMemo } from 'react';
import { uuiDayjs } from '../../../helpers';
import { defaultPredicates, rangeDatePickerPresets, FiltersPanel, DataTable, Panel, FlexRow, Text, Switch, Badge, BadgeProps } from '@epam/uui';
import { DataColumnProps, getSeparatedValue, LazyDataSource, TableFiltersConfig, useLazyDataSource, useTableState, useUuiContext } from '@epam/uui-core';
import { Person } from '@epam/uui-docs';

const personColumns: DataColumnProps<Person, number>[] = [
    {
        key: 'name',
        caption: 'Name',
        render: (p) => <Text>{p.name}</Text>,
        width: 180,
        isSortable: true,
        isAlwaysVisible: true,
    },
    {
        key: 'profileStatus',
        caption: 'Profile status',
        render: (p) =>
            p.profileStatus && (
                <FlexRow>
                    <Badge indicator size="24" fill="outline" color={ p.profileStatus.toLowerCase() as BadgeProps['color'] } caption={ p.profileStatus } />
                </FlexRow>
            ),
        width: 140,
        isSortable: true,
        isFilterActive: (f) => !!f.profileStatusId,
    },
    {
        key: 'salary',
        caption: 'Salary',
        render: (p) => (
            <Text>
                {getSeparatedValue(+p.salary, {
                    style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2,
                }, 'en-US')}
            </Text>
        ),
        width: 150,
        textAlign: 'right',
        isSortable: true,
    },
    {
        key: 'jobTitle',
        caption: 'Title',
        render: (r) => <Text>{r.jobTitle}</Text>,
        width: 200,
        isFilterActive: (f) => !!f.jobTitleId,
    },
    {
        key: 'productionCategory',
        caption: 'Is Production',
        render: (r) => <Text>{r.productionCategory ? 'Yes' : 'No' }</Text>,
        width: 100,
        isFilterActive: (f) => !!f.jobTitleId,
    },
    {
        key: 'birthDate',
        caption: 'Birth date',
        render: (p) => p?.birthDate && <Text>{uuiDayjs.dayjs(p.birthDate).format('MMM D, YYYY')}</Text>,
        width: 120,
        isSortable: true,
    },
    {
        key: 'hireDate',
        caption: 'Hire date',
        render: (p) => p?.hireDate && <Text>{uuiDayjs.dayjs(p.hireDate).format('MMM D, YYYY')}</Text>,
        width: 120,
        isSortable: true,
    },
];

export default function FiltersPanelExample() {
    const svc = useUuiContext();

    const filtersConfig = useMemo<TableFiltersConfig<Person>[]>(
        () => [
            {
                field: 'profileStatusId',
                columnKey: 'profileStatus',
                title: 'Profile status',
                type: 'multiPicker',
                isAlwaysVisible: true,
                dataSource: new LazyDataSource({ api: svc.api.demo.statuses }),
                predicates: defaultPredicates.multiPicker,
                showSearch: false,
                maxCount: 3,
            },
            {
                field: 'jobTitleId',
                columnKey: 'jobTitle',
                title: 'Title',
                type: 'multiPicker',
                togglerWidth: 400,
                dataSource: new LazyDataSource({ api: svc.api.demo.jobTitles }),
            },
            {
                field: 'salary',
                columnKey: 'salary',
                title: 'Salary',
                type: 'numeric',
                predicates: defaultPredicates.numeric,
            },
            {
                field: 'birthDate',
                columnKey: 'birthDate',
                title: 'Birth date',
                type: 'datePicker',
            },
            {
                field: 'productionCategory',
                columnKey: 'productionCategory',
                title: 'Is Production',
                type: 'custom',
                render: (props) => {
                    return (
                        <FlexRow vPadding="12" padding="12">
                            <Switch label="Show only production projects" value={ props.value } onValueChange={ props.onValueChange } />
                        </FlexRow>
                    );
                },
                getTogglerValue: (props) => {
                    if (props.value !== undefined) {
                        return props.value ? 'Yes' : 'No';
                    }
                },
            },
            {
                field: 'hireDate',
                columnKey: 'hireDate',
                title: 'Hire date',
                type: 'rangeDatePicker',
                predicates: defaultPredicates.rangeDatePicker,
                presets: {
                    ...rangeDatePickerPresets,
                    last3Days: {
                        name: 'Last 3 days',
                        getRange: () => {
                            return { from: uuiDayjs.dayjs().subtract(3, 'day').toString(), to: uuiDayjs.dayjs().toString(), order: 11 };
                        },
                    },
                    last7Days: {
                        name: 'Last 7 days',
                        getRange: () => {
                            return { from: uuiDayjs.dayjs().subtract(7, 'day').toString(), to: uuiDayjs.dayjs().toString(), order: 12 };
                        },
                    },
                },
            },
        ],
        [],
    );

    const { tableState, setTableState } = useTableState({
        columns: personColumns,
        filters: filtersConfig,
    });

    const dataSource = useLazyDataSource<Person, number, Person>(
        {
            api: svc.api.demo.persons,
            backgroundReload: true,
        },
        [],
    );

    const view = dataSource.useView(tableState, setTableState);

    return (
        <Panel background="surface-main" shadow style={ { height: '400px' } }>
            <FlexRow padding="12" vPadding="24" rawProps={ { style: { flexWrap: 'wrap', gap: '3px' } } }>
                <FiltersPanel filters={ filtersConfig } tableState={ tableState } setTableState={ setTableState } />
            </FlexRow>
            <DataTable getRows={ view.getVisibleRows } columns={ personColumns } value={ tableState } onValueChange={ setTableState } { ...view.getListProps() } />
        </Panel>
    );
}
