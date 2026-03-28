import { type DragEvent, type ReactNode, useRef, useState } from 'react';
import { Upload01 } from '@untitledui/icons/Upload01';

import { cn } from '../lib/cn';
import styles from './DropZone.module.css';

export type DropZoneProps = {
  /** File types to accept (e.g., ".csv,.xlsx") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Callback when files are selected */
  onFiles: (files: FileList) => void;
  /** Main instruction text */
  text?: string;
  /** Custom icon (defaults to Upload01) */
  icon?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
};

/**
 * Drag-and-drop file upload zone with click-to-browse fallback.
 */
export function DropZone({
  accept,
  multiple = true,
  onFiles,
  text = 'Drop files or click to browse',
  icon,
  disabled,
  className,
}: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepth.current++;
    if (!disabled) setDragActive(true);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepth.current--;
    if (dragDepth.current === 0) setDragActive(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepth.current = 0;
    setDragActive(false);
    if (!disabled && e.dataTransfer.files?.length) {
      onFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFiles(e.target.files);
    }
    e.target.value = '';
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={cn(
        styles.dropZone,
        dragActive && styles.active,
        disabled && styles.disabled,
        className,
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={text}
      aria-disabled={disabled}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className={styles.hiddenInput}
        aria-hidden="true"
        disabled={disabled}
      />
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <Upload01 size={14} />}
      </span>
      <span className={styles.text}>{text}</span>
    </div>
  );
}
