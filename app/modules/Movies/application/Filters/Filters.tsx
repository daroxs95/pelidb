import styles from "./Filters.module.css"
import {useEffect, useRef, useState} from "react";
import {useDebounced} from "~/hooks/useDebounced";

interface FiltersProps {
    onChange: (value: string) => void;
    value?: string;
}

export function Filters({onChange, value}: FiltersProps) {
    const [search, setSearch] = useState(value || '');
    const [searching, setSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const isSearchingTimeout = useRef<any>(null);

    const debouncedSearch = useDebounced(search, 300);

    const onSearch = (value: string) => {
        setSearch(value);
    }

    useEffect(() => {
        onChange(debouncedSearch);
    }, [debouncedSearch]);

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Escape') return;

            setSearching(true);
            if (isSearchingTimeout.current) clearTimeout(isSearchingTimeout.current);
            isSearchingTimeout.current = setTimeout(() => {
                setSearching(false);
            }, 3000);
            inputRef.current?.focus();
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                setSearching(false);
            }
        });

        return () => {
            window.removeEventListener('keydown', () => {
            });
            window.removeEventListener('keyup', () => {
            });
        }
    }, []);

    return (
        <div className={`${styles.container} ${searching ? styles.open : ""}`}>
            <div className={styles.controls}>
                <input
                    ref={inputRef}
                    autoFocus
                    className={styles.input}
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onSearch(e.target.value)}
                    value={search}
                />
            </div>
        </div>
    );
}