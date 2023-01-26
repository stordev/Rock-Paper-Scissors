export const clearAllTimers = () => {
    Object.values(window.application.timers).forEach(clearInterval);
}