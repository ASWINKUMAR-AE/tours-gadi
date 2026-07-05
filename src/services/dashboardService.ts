export interface BookingStats {
    activeTrips: number;
    completed: number;
    pending: number;
    total: number;
}

export interface DriverSummaryItem {
    id: number;
    name: string;
    current_location?: {
        lat: number;
        lng: number;
    };
}

export interface DriversSummary {
    active: DriverSummaryItem[];
    running: DriverSummaryItem[];
    offline: DriverSummaryItem[];
}

export interface DriverLocation {
    id: number;
    name: string;
    lat: number;
    lng: number;
    status: 'available' | 'busy';
}

export const dashboardService = {
    /**
     * Fetch booking statistics
     */
    getStats: async () => {
        // Return mock statistics so the UI has realistic data immediately
        return {
            success: true,
            stats: {
                activeTrips: 42,
                completed: 1250,
                pending: 5,
                total: 1297
            }
        };
    },

    /**
     * Fetch categorized driver summary
     */
    getDriversSummary: async () => {
        return {
            success: true,
            summary: {
                active: [
                    { id: 1, name: 'John Doe', current_location: { lat: 12.9716, lng: 77.5946 } },
                    { id: 2, name: 'Jane Smith', current_location: { lat: 12.9279, lng: 77.6271 } }
                ],
                running: [
                    { id: 3, name: 'Bob Johnson', current_location: { lat: 12.9345, lng: 77.6101 } }
                ],
                offline: [
                    { id: 4, name: 'Alice Brown' }
                ]
            }
        };
    },

    /**
     * Fetch real-time driver locations for online drivers
     */
    getDriverLocations: async () => {
        return {
            success: true,
            locations: [
                { id: 1, name: 'John Doe', lat: 12.9716, lng: 77.5946, status: 'available' as const },
                { id: 2, name: 'Jane Smith', lat: 12.9279, lng: 77.6271, status: 'available' as const },
                { id: 3, name: 'Bob Johnson', lat: 12.9345, lng: 77.6101, status: 'busy' as const }
            ]
        };
    },
};
