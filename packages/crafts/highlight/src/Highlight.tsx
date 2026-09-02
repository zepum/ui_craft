import {
  ChevronRight,
  CircleHelp,
  Code2,
  Copy,
  FilePlus2,
  FolderInput,
  Globe2,
  Hash,
  History,
  Layers3,
  type LucideIcon,
  Menu,
  Moon,
  PanelLeft,
  PanelTop,
  PanelsTopLeft,
  Ruler,
  Search,
  Settings2,
  SlidersHorizontal,
} from 'lucide-react';
import { type KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import styles from './Highlight.module.css';

export type HighlightAction =
  | 'new-design'
  | 'duplicate'
  | 'move-to-folder'
  | 'version-history'
  | 'change-mode'
  | 'find-and-replace'
  | 'guide-settings'
  | 'page-numbers'
  | 'layer-order'
  | 'language'
  | 'dark-mode'
  | 'help'
  | 'developer-mode';

export type EditorLayout = 'panel' | 'toolbar';

export type HighlightProps = {
  defaultOpen?: boolean;
  defaultEditorLayout?: EditorLayout;
  onAction?: (action: HighlightAction) => void;
  onEditorLayoutChange?: (layout: EditorLayout) => void;
};

type MenuItem = {
  id: HighlightAction;
  label: string;
  icon: LucideIcon;
  shortcut?: string;
  type?: 'toggle';
};

const MENU_GROUPS: readonly (readonly MenuItem[])[] = [
  [
    { id: 'new-design', label: '새 디자인 만들기', icon: FilePlus2 },
    { id: 'duplicate', label: '사본 만들기', icon: Copy },
    { id: 'move-to-folder', label: '폴더로 이동', icon: FolderInput },
    { id: 'version-history', label: '버전 기록', icon: History },
  ],
  [{ id: 'change-mode', label: '모드 변경', icon: PanelsTopLeft }],
  [
    { id: 'find-and-replace', label: '텍스트 찾기 및 바꾸기', icon: Search, shortcut: '⌘F' },
    { id: 'guide-settings', label: '안내선 설정', icon: Ruler },
    { id: 'page-numbers', label: '페이지 번호', icon: Hash },
    { id: 'layer-order', label: '레이어 순서', icon: Layers3, shortcut: '⌘⇧Y', type: 'toggle' },
  ],
  [
    { id: 'language', label: '언어', icon: Globe2 },
    { id: 'dark-mode', label: '다크 모드', icon: Moon, type: 'toggle' },
    { id: 'help', label: '도움말', icon: CircleHelp },
    { id: 'developer-mode', label: '개발 모드', icon: Code2 },
  ],
];

const getMenuItems = (container: HTMLElement | null) =>
  container ? Array.from(container.querySelectorAll<HTMLButtonElement>('[data-menu-item="true"]')) : [];

export const Highlight = ({
  defaultOpen = false,
  defaultEditorLayout = 'toolbar',
  onAction,
  onEditorLayoutChange,
}: HighlightProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const [editorSettingsOpen, setEditorSettingsOpen] = useState(defaultOpen);
  const [editorLayout, setEditorLayout] = useState<EditorLayout>(defaultEditorLayout);
  const [layerOrderEnabled, setLayerOrderEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const editorSettingsRef = useRef<HTMLButtonElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const submenuId = useId();

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    setEditorSettingsOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => getMenuItems(menuRef.current)[0]?.focus());
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setEditorSettingsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [open]);

  const selectAction = (item: MenuItem) => {
    if (item.id === 'layer-order') {
      setLayerOrderEnabled(value => !value);
      onAction?.(item.id);
      return;
    }
    if (item.id === 'dark-mode') {
      setDarkMode(value => !value);
      onAction?.(item.id);
      return;
    }

    onAction?.(item.id);
    closeMenu(true);
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = getMenuItems(menuRef.current);
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
    let nextIndex: number | undefined;

    if (event.key === 'ArrowDown') nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    if (event.key === 'ArrowUp') nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = items.length - 1;
    if (event.key === 'ArrowRight' && document.activeElement === editorSettingsRef.current) {
      event.preventDefault();
      setEditorSettingsOpen(true);
      requestAnimationFrame(() => getMenuItems(submenuRef.current)[0]?.focus());
      return;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      items[nextIndex]?.focus();
    }
  };

  const handleSubmenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = getMenuItems(submenuRef.current);
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      items[(currentIndex + direction + items.length) % items.length]?.focus();
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      setEditorSettingsOpen(false);
      editorSettingsRef.current?.focus();
    }
  };

  const selectEditorLayout = (layout: EditorLayout) => {
    setEditorLayout(layout);
    onEditorLayoutChange?.(layout);
  };

  return (
    <div
      className={styles.root}
      data-dark={darkMode}
      onKeyDownCapture={event => {
        if (!open || event.key !== 'Escape') return;
        event.preventDefault();
        event.stopPropagation();

        if (editorSettingsOpen) {
          setEditorSettingsOpen(false);
          editorSettingsRef.current?.focus();
          return;
        }

        closeMenu(true);
      }}
      ref={rootRef}
    >
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup='menu'
        aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        className={styles.trigger}
        onClick={() => (open ? closeMenu() : setOpen(true))}
        onKeyDown={event => {
          if (!open && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        ref={triggerRef}
        type='button'
      >
        <Menu aria-hidden='true' size={22} strokeWidth={1.8} />
      </button>

      {open ? (
        <div className={styles.popoverFrame}>
          <div
            aria-label='디자인 메뉴'
            className={styles.menu}
            id={menuId}
            onKeyDown={handleMenuKeyDown}
            ref={menuRef}
            role='menu'
          >
            {MENU_GROUPS.map((group, groupIndex) => (
              <div className={styles.menuGroup} key={group[0]?.id ?? groupIndex} role='presentation'>
                {group.map(item => {
                  const Icon = item.icon;
                  const checked =
                    item.id === 'layer-order' ? layerOrderEnabled : item.id === 'dark-mode' ? darkMode : false;
                  return (
                    <button
                      aria-checked={item.type === 'toggle' ? checked : undefined}
                      className={styles.menuItem}
                      data-menu-item='true'
                      key={item.id}
                      onClick={() => selectAction(item)}
                      role={item.type === 'toggle' ? 'menuitemcheckbox' : 'menuitem'}
                      type='button'
                    >
                      <Icon aria-hidden='true' className={styles.itemIcon} size={18} strokeWidth={1.7} />
                      <span className={styles.itemLabel}>{item.label}</span>
                      {item.shortcut || item.type === 'toggle' ? (
                        <span className={styles.itemMeta}>
                          {item.shortcut ? <span className={styles.shortcut}>{item.shortcut}</span> : null}
                          {item.type === 'toggle' ? (
                            <span aria-hidden='true' className={styles.switch} data-checked={checked}>
                              <span className={styles.switchThumb} />
                            </span>
                          ) : null}
                        </span>
                      ) : null}
                    </button>
                  );
                })}

                {groupIndex === 2 ? (
                  <button
                    aria-controls={submenuId}
                    aria-expanded={editorSettingsOpen}
                    aria-haspopup='menu'
                    className={styles.menuItem}
                    data-active={editorSettingsOpen}
                    data-menu-item='true'
                    onClick={() => setEditorSettingsOpen(true)}
                    onFocus={() => setEditorSettingsOpen(true)}
                    onPointerEnter={() => setEditorSettingsOpen(true)}
                    ref={editorSettingsRef}
                    role='menuitem'
                    type='button'
                  >
                    <SlidersHorizontal aria-hidden='true' className={styles.itemIcon} size={18} strokeWidth={1.7} />
                    <span className={styles.itemLabel}>편집 환경 설정</span>
                    <ChevronRight aria-hidden='true' className={styles.chevron} size={16} strokeWidth={1.7} />
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          {editorSettingsOpen ? (
            <div
              aria-label='편집 환경 설정'
              className={styles.submenu}
              id={submenuId}
              onKeyDown={handleSubmenuKeyDown}
              ref={submenuRef}
              role='menu'
            >
              <div className={styles.submenuHeader}>
                <Settings2 aria-hidden='true' size={18} strokeWidth={1.7} />
                <div>
                  <h2 className={styles.submenuTitle}>편집 환경 설정</h2>
                  <p className={styles.submenuDescription}>디자인 편집 환경을 선택하세요.</p>
                </div>
              </div>
              <div className={styles.layoutOptions}>
                <button
                  aria-checked={editorLayout === 'panel'}
                  className={styles.layoutOption}
                  data-menu-item='true'
                  data-selected={editorLayout === 'panel'}
                  onClick={() => selectEditorLayout('panel')}
                  role='menuitemradio'
                  type='button'
                >
                  <span aria-hidden='true' className={styles.layoutPreview} data-layout='panel'>
                    <PanelLeft size={24} strokeWidth={1.5} />
                  </span>
                  <span>패널형</span>
                </button>
                <button
                  aria-checked={editorLayout === 'toolbar'}
                  className={styles.layoutOption}
                  data-menu-item='true'
                  data-selected={editorLayout === 'toolbar'}
                  onClick={() => selectEditorLayout('toolbar')}
                  role='menuitemradio'
                  type='button'
                >
                  <span aria-hidden='true' className={styles.layoutPreview} data-layout='toolbar'>
                    <PanelTop size={24} strokeWidth={1.5} />
                  </span>
                  <span>툴바형</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
