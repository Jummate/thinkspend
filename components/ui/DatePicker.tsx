"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const YEARS_PER_PAGE = 12;

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  "aria-label"?: string;
  error?: string;
  hint?: string;
  onValueChange?: (value: string) => void;
  triggerClassName?: string;
  dropdownClassName?: string;
  dropdownPosition?: "bottom" | "top" | "auto";
}

type CalendarView = "days" | "months" | "years";

function parseDate(value?: string) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(value?: string) {
  const parsed = parseDate(value);
  if (!parsed) return "";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getMonthDays(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function setNativeInputValue(input: HTMLInputElement, nextValue: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;

  valueSetter?.call(input, nextValue);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

const DatePicker = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      "aria-label": ariaLabel,
      error,
      hint,
      className,
      triggerClassName,
      dropdownClassName,
      dropdownPosition = "auto",
      id,
      value,
      defaultValue,
      onValueChange,
      onBlur,
      placeholder = "Select date",
      disabled,
      required,
      min,
      max,
      name,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const inputId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : reactId);
    const accessibleName = ariaLabel ?? label;
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const today = useMemo(() => new Date(), []);
    const isControlled = value !== undefined;
    const [open, setOpen] = useState(false);
    const [resolvedPosition, setResolvedPosition] = useState<"bottom" | "top">(
      "bottom",
    );
    const [internalValue, setInternalValue] = useState(
      typeof defaultValue === "string" ? defaultValue : "",
    );

    const selectedValue = isControlled ? String(value ?? "") : internalValue;
    const selectedDate = useMemo(
      () => parseDate(selectedValue),
      [selectedValue],
    );
    const [viewDate, setViewDate] = useState<Date>(selectedDate ?? today);
    const [calendarView, setCalendarView] = useState<CalendarView>("days");
    const [yearPageStart, setYearPageStart] = useState(() => {
      const initialYear = (selectedDate ?? today).getFullYear();
      return Math.floor(initialYear / YEARS_PER_PAGE) * YEARS_PER_PAGE;
    });

    // Roving-tabindex focus target for the days grid. When this changes,
    // the matching day button receives DOM focus. Kept separate from
    // `viewDate` because moving focus across a month boundary needs to
    // update the view too, but the reverse (navigating the view) does
    // not necessarily move focus.
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);

    const minDate = parseDate(typeof min === "string" ? min : undefined);
    const maxDate = parseDate(typeof max === "string" ? max : undefined);

    useEffect(() => {
      if (selectedDate) {
        setViewDate(selectedDate);
        setYearPageStart(
          Math.floor(selectedDate.getFullYear() / YEARS_PER_PAGE) *
            YEARS_PER_PAGE,
        );
      }
    }, [selectedDate]);

    useEffect(() => {
      if (!open) {
        setCalendarView("days");
        setFocusedDate(null);
      }
    }, [open]);

   useClickOutside(
  containerRef,
  () => {
    setOpen(false);
    onBlur?.({
      target: hiddenInputRef.current,
    } as React.FocusEvent<HTMLInputElement>);
  },
  open,
);

    useEffect(() => {
      if (isControlled && hiddenInputRef.current) {
        hiddenInputRef.current.value = selectedValue;
      }
    }, [isControlled, selectedValue]);

    // When the popover opens in days view, seed the roving focus target
    // with the selected day, or today, or the 1st — whichever is valid.
    useEffect(() => {
      if (!open || calendarView !== "days") return;
      if (focusedDate) return;

      const seed =
        selectedDate ??
        (isDayDisabled(today)
          ? new Date(today.getFullYear(), today.getMonth(), 1)
          : today);
      setFocusedDate(seed);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, calendarView]);

    // After the roving target changes, move DOM focus to the matching
    // day button so keyboard users can continue navigating.
    useEffect(() => {
      if (!focusedDate || calendarView !== "days" || !open) return;
      const key = toISODate(focusedDate);
      const node = gridRef.current?.querySelector<HTMLButtonElement>(
        `[data-day="${key}"]`,
      );
      node?.focus();
    }, [focusedDate, calendarView, open]);

    function setRefs(node: HTMLInputElement | null) {
      hiddenInputRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }

    function isDayDisabled(day: Date) {
      if (minDate && day < minDate) return true;
      if (maxDate && day > maxDate) return true;
      return false;
    }

    function isMonthDisabled(yearValue: number, monthValue: number) {
      const firstDay = new Date(yearValue, monthValue, 1);
      const lastDay = new Date(yearValue, monthValue + 1, 0);
      if (minDate && lastDay < minDate) return true;
      if (maxDate && firstDay > maxDate) return true;
      return false;
    }

    function isYearDisabled(yearValue: number) {
      if (minDate && yearValue < minDate.getFullYear()) return true;
      if (maxDate && yearValue > maxDate.getFullYear()) return true;
      return false;
    }

    const todayDisabled = isDayDisabled(
      new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    );

    function updateValue(nextValue: string) {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      if (hiddenInputRef.current) {
        setNativeInputValue(hiddenInputRef.current, nextValue);
      }

      onValueChange?.(nextValue);
    }

    function closeAndBlur() {
      setOpen(false);
      onBlur?.({
        target: hiddenInputRef.current,
      } as React.FocusEvent<HTMLInputElement>);
      triggerRef.current?.focus();
    }

    function selectDay(dayNumber: number) {
      const nextDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        dayNumber,
      );
      updateValue(toISODate(nextDate));
      closeAndBlur();
    }

    function shiftViewDate(monthDelta: number) {
      setViewDate(
        (current) =>
          new Date(current.getFullYear(), current.getMonth() + monthDelta, 1),
      );
    }

    function handleHeaderClick() {
      if (calendarView === "days") {
        setYearPageStart(Math.floor(year / YEARS_PER_PAGE) * YEARS_PER_PAGE);
        setCalendarView("years");
      } else if (calendarView === "years") {
        setCalendarView("months");
      } else {
        setCalendarView("days");
      }
    }

    function selectYear(nextYear: number) {
      setViewDate((current) => new Date(nextYear, current.getMonth(), 1));
      setCalendarView("months");
    }

    function selectMonth(nextMonth: number) {
      setViewDate((current) => new Date(current.getFullYear(), nextMonth, 1));
      setCalendarView("days");
    }

    /**
     * Keyboard navigation for the days grid. Only active in "days" view
     * — months/years views use plain buttons with native tab order.
     *
     * ArrowLeft/Right: ±1 day
     * ArrowUp/Down:    ±7 days
     * Home/End:        start/end of the current week row
     * PageUp/PageDown: ±1 month, clamped to the same day-of-month where possible
     */
    const handleDayGridKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!focusedDate) return;

        const key = event.key;
        const handled = [
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Home",
          "End",
          "PageUp",
          "PageDown",
        ].includes(key);

        if (!handled) return;

        event.preventDefault();

        const next = new Date(focusedDate);

        if (key === "ArrowLeft") next.setDate(next.getDate() - 1);
        if (key === "ArrowRight") next.setDate(next.getDate() + 1);
        if (key === "ArrowUp") next.setDate(next.getDate() - 7);
        if (key === "ArrowDown") next.setDate(next.getDate() + 7);
        if (key === "Home") next.setDate(next.getDate() - next.getDay());
        if (key === "End") next.setDate(next.getDate() + (6 - next.getDay()));
        if (key === "PageUp") next.setMonth(next.getMonth() - 1);
        if (key === "PageDown") next.setMonth(next.getMonth() + 1);

        // Clamp to min/max so keyboard navigation can't wander out of range.
        if (minDate && next < minDate) return;
        if (maxDate && next > maxDate) return;

        // If we crossed a month boundary, update the visible month too.
        if (
          next.getMonth() !== viewDate.getMonth() ||
          next.getFullYear() !== viewDate.getFullYear()
        ) {
          setViewDate(new Date(next.getFullYear(), next.getMonth(), 1));
        }

        setFocusedDate(next);
      },
      [focusedDate, minDate, maxDate, viewDate],
    );

    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    const yearCells = Array.from(
      { length: YEARS_PER_PAGE },
      (_, index) => yearPageStart + index,
    );
    const headerLabel =
      calendarView === "years"
        ? `${yearPageStart} - ${yearPageStart + YEARS_PER_PAGE - 1}`
        : calendarView === "months"
          ? String(year)
          : `${MONTHS[month]} ${year}`;
    const daysInMonth = getMonthDays(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const cells = [
      ...Array(firstDayOfMonth).fill(null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];

    while (cells.length % 7 !== 0) cells.push(null);

    return (
      <div
        ref={containerRef}
        className={cn("relative flex flex-col gap-1", className)}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <input
          {...props}
          ref={setRefs}
          id={`${inputId}-value`}
          name={name}
          type="hidden"
          value={selectedValue}
          readOnly
        />

        <button
          ref={triggerRef}
          type="button"
          id={inputId}
          disabled={disabled}
          aria-label={accessibleName}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => {
            const next = !open;
            if (next && dropdownPosition === "auto" && triggerRef.current) {
              const rect = triggerRef.current.getBoundingClientRect();
              // Calendar dropdown is ~360px tall — use that as the threshold
              setResolvedPosition(
                window.innerHeight - rect.bottom >= 360 ? "bottom" : "top",
              );
            }
            setOpen(next);
          }}
          className={cn(
            "h-10 rounded-lg px-3 text-sm text-left transition-shadow",
            "flex items-center justify-between gap-3 focus:outline-none focus:border-transparent",
            // Border + ring live in mutually-exclusive branches because
            // `cn` is plain clsx (no tailwind-merge) — concatenating
            // e.g. `border-border` with `border-danger` would leave both
            // in the class string and let stylesheet order decide the
            // winner. One branch, one set of classes.
            disabled
              ? "cursor-not-allowed border border-border bg-secondary text-muted-foreground opacity-50 shadow-none"
              : error
                ? "border border-danger focus:ring-2 focus:ring-danger"
                : "border border-border focus:ring-2 focus:ring-primary",
            triggerClassName,
          )}
        >
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-muted-foreground" />
            <span
              className={cn(
                selectedValue && !disabled
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {selectedValue ? formatDisplayDate(selectedValue) : placeholder}
            </span>
          </div>
          <ChevronDown
            size={16}
            className={cn(
              "shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open && !disabled && (
          <div
            role="dialog"
            aria-label="Choose date"
            className={cn(
              "absolute z-50 w-full max-w-[320px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl",
              dropdownPosition === "top" ||
                (dropdownPosition === "auto" && resolvedPosition === "top")
                ? "bottom-full mb-1"
                : "top-full mt-1",
              dropdownClassName,
            )}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                closeAndBlur();
              }
            }}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <button
                type="button"
                onClick={() => {
                  if (calendarView === "years") {
                    setYearPageStart((current) => current - YEARS_PER_PAGE);
                  } else if (calendarView === "months") {
                    setViewDate(
                      (current) =>
                        new Date(
                          current.getFullYear() - 1,
                          current.getMonth(),
                          1,
                        ),
                    );
                  } else {
                    shiftViewDate(-1);
                  }
                }}
                aria-label="Previous"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={handleHeaderClick}
                className="min-w-32 rounded px-1 text-center text-sm font-semibold text-foreground transition-colors hover:text-primary"
                title={
                  calendarView === "days"
                    ? "Click to pick a year"
                    : calendarView === "years"
                      ? "Click to pick a month"
                      : "Click to return to calendar"
                }
              >
                {headerLabel}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (calendarView === "years") {
                    setYearPageStart((current) => current + YEARS_PER_PAGE);
                  } else if (calendarView === "months") {
                    setViewDate(
                      (current) =>
                        new Date(
                          current.getFullYear() + 1,
                          current.getMonth(),
                          1,
                        ),
                    );
                  } else {
                    shiftViewDate(1);
                  }
                }}
                aria-label="Next"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {calendarView === "years" ? (
              <div className="grid grid-cols-3 gap-1 p-3">
                {yearCells.map((yearValue) => {
                  const disabledYear = isYearDisabled(yearValue);
                  const isSelectedYear = yearValue === year;
                  const isCurrentYear = yearValue === today.getFullYear();

                  return (
                    <button
                      key={yearValue}
                      type="button"
                      disabled={disabledYear}
                      aria-current={isCurrentYear ? "date" : undefined}
                      onClick={() => selectYear(yearValue)}
                      className={cn(
                        "rounded-lg py-1.5 text-sm font-medium transition-colors",
                        isSelectedYear
                          ? "bg-primary text-primary-foreground"
                          : isCurrentYear
                            ? "border border-primary text-primary hover:bg-primary/10"
                            : disabledYear
                              ? "cursor-not-allowed text-muted-foreground opacity-50"
                              : "text-foreground hover:bg-secondary",
                      )}
                    >
                      {yearValue}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {calendarView === "months" ? (
              <div className="grid grid-cols-3 gap-1 p-3">
                {MONTHS_SHORT.map((monthName, monthIndex) => {
                  const disabledMonth = isMonthDisabled(year, monthIndex);
                  const isSelectedMonth =
                    monthIndex === month && selectedDate?.getFullYear() === year;
                  const isCurrentMonth =
                    monthIndex === today.getMonth() &&
                    year === today.getFullYear();

                  return (
                    <button
                      key={monthName}
                      type="button"
                      disabled={disabledMonth}
                      aria-current={isCurrentMonth ? "date" : undefined}
                      onClick={() => selectMonth(monthIndex)}
                      className={cn(
                        "rounded-lg py-1.5 text-sm font-medium transition-colors",
                        isSelectedMonth
                          ? "bg-primary text-primary-foreground"
                          : isCurrentMonth
                            ? "border border-primary text-primary hover:bg-primary/10"
                            : disabledMonth
                              ? "cursor-not-allowed text-muted-foreground opacity-50"
                              : "text-foreground hover:bg-secondary",
                      )}
                    >
                      {monthName}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {calendarView === "days" ? (
              <>
                <div className="grid grid-cols-7 px-3 pt-3 pb-1">
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      className="py-1 text-center text-xs font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div
                  ref={gridRef}
                  role="grid"
                  aria-label={`${MONTHS[month]} ${year}`}
                  onKeyDown={handleDayGridKeyDown}
                  className="grid grid-cols-7 gap-y-1 px-3 pb-3"
                >
                  {cells.map((dayNumber, index) => {
                    if (!dayNumber) {
                      return (
                        <div
                          key={`empty-${index}`}
                          role="gridcell"
                          aria-hidden="true"
                        />
                      );
                    }

                    const currentDate = new Date(year, month, dayNumber);
                    const disabledDay = isDayDisabled(currentDate);
                    const isSelected =
                      selectedDate &&
                      dayNumber === selectedDate.getDate() &&
                      month === selectedDate.getMonth() &&
                      year === selectedDate.getFullYear();
                    const isToday =
                      dayNumber === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear();
                    const isFocused =
                      focusedDate &&
                      dayNumber === focusedDate.getDate() &&
                      month === focusedDate.getMonth() &&
                      year === focusedDate.getFullYear();
                    const iso = toISODate(currentDate);

                    return (
                      <button
                        key={dayNumber}
                        type="button"
                        role="gridcell"
                        data-day={iso}
                        tabIndex={isFocused ? 0 : -1}
                        disabled={disabledDay}
                        aria-selected={isSelected ? true : undefined}
                        aria-current={isToday ? "date" : undefined}
                        aria-label={currentDate.toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                        onFocus={() => setFocusedDate(currentDate)}
                        onClick={() => selectDay(dayNumber)}
                        className={cn(
                          "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                          isSelected
                            ? "bg-primary text-primary-foreground font-semibold"
                            : isToday
                              ? "border border-primary text-primary font-semibold hover:bg-primary/10"
                              : disabledDay
                                ? "cursor-not-allowed text-muted-foreground opacity-50"
                                : "text-foreground hover:bg-secondary",
                        )}
                      >
                        {dayNumber}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : null}

            <div className="flex items-center justify-between border-t border-border px-4 py-2">
              <button
                type="button"
                disabled={todayDisabled}
                onClick={() => {
                  setViewDate(today);
                  updateValue(toISODate(today));
                  closeAndBlur();
                }}
                className="text-xs font-medium text-primary transition-colors hover:text-primary-dark disabled:cursor-not-allowed disabled:text-muted-foreground"
              >
                Today
              </button>

              {!required && selectedValue ? (
                <button
                  type="button"
                  onClick={() => {
                    updateValue("");
                    closeAndBlur();
                  }}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        )}

        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

export default DatePicker;