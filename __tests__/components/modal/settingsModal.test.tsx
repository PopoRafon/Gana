import type { Setting } from '@/components/modal/types';
import type { Mock } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { test, describe, expect, vi, beforeEach } from 'vitest';
import SettingsModal from '@/components/modal/settingsModal';

describe('settingsModal component', () => {
    let handleDeleteMock: Mock;
    let handleUpdateMock: Mock;
    let settings: Setting[];

    beforeEach(() => {
        handleDeleteMock = vi.fn();
        handleUpdateMock = vi.fn();
        settings = [
            { text: 'Delete', handleClick: handleDeleteMock },
            { text: 'Update', handleClick: handleUpdateMock }
        ];
    });

    test('correctly renders modal with provided settings', () => {
        const { getByText } = render(
            <SettingsModal
                settings={settings}
                setShowSettings={() => {}}
            />
        );

        expect(getByText(settings[0].text)).toBeInTheDocument();
        expect(getByText(settings[1].text)).toBeInTheDocument();
    });

    test('when modal button gets clicked calls handleClick function from provided setting', () => {
        const { getByText } = render(
            <SettingsModal
                settings={settings}
                setShowSettings={() => {}}
            />
        );

        fireEvent.click(getByText(settings[0].text));

        expect(settings[0].handleClick).toHaveBeenCalledOnce();
        expect(settings[1].handleClick).not.toHaveBeenCalled();

        fireEvent.click(getByText(settings[1].text));

        expect(settings[1].handleClick).toHaveBeenCalledOnce();
    });

    test('calls setShowSettings function when click event occurs outside of modal', () => {
        const setShowSettingsMock = vi.fn();
        render(
            <SettingsModal
                settings={settings}
                setShowSettings={setShowSettingsMock}
            />
        );

        fireEvent.click(document);

        expect(setShowSettingsMock).toHaveBeenCalledOnce();
        expect(setShowSettingsMock).toHaveBeenCalledWith(false);
    });
});
