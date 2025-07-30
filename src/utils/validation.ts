/**
 * Validation utilities for API data
 * Ensures data integrity and prevents XSS attacks
 */

// Types for API validation
export interface ApiCivilization {
    id: number;
    name: string;
    description?: string;
    unique_units?: Array<{
        name: string;
        url: string;
        icon?: string;
    }>;
    unique_buildings?: Array<{
        name: string;
        url: string;
        icon?: string;
    }>;
    tags_id?: number[];
    tier_id?: number;
    leader: {
        name: string;
        icon: string;
        trait: {
            effect: string;
        };
    };
    historical_info: Array<{
        text: string;
    }>;
    icon?: string;
}

export interface ApiUnit {
    name: string;
    url: string;
    icon?: string;
}

export interface ApiBuilding {
    name: string;
    url: string;
    icon?: string;
}

// URL validation
export function isValidUrl(url: string): boolean {
    try {
        const urlObj = new URL(url);
        // Only allow specific domains
        const allowedDomains = ['eyefyre.github.io', 'localhost', '127.0.0.1'];
        return allowedDomains.some(domain => urlObj.hostname.includes(domain));
    } catch {
        return false;
    }
}

// Sanitize string to prevent XSS
export function sanitizeString(str: string): string {
    if (typeof str !== 'string') return '';
    
    // Remove potentially dangerous characters
    return str
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim();
}

// Validate civilization data
export function validateCivilization(data: any): ApiCivilization | null {
    try {
        // Check required fields
        if (!data || typeof data !== 'object') return null;
        if (typeof data.id !== 'number' || data.id <= 0) return null;
        if (typeof data.name !== 'string' || !data.name.trim()) return null;
        
        // Validate leader
        if (!data.leader || typeof data.leader !== 'object') return null;
        if (typeof data.leader.name !== 'string' || !data.leader.name.trim()) return null;
        if (typeof data.leader.icon !== 'string' || !isValidUrl(data.leader.icon)) return null;
        if (!data.leader.trait || typeof data.leader.trait.effect !== 'string') return null;
        
        // Validate historical info
        if (!Array.isArray(data.historical_info) || data.historical_info.length === 0) return null;
        if (!data.historical_info[0] || typeof data.historical_info[0].text !== 'string') return null;
        
        // Sanitize and validate data
        const validated: ApiCivilization = {
            id: data.id,
            name: sanitizeString(data.name),
            description: data.description ? sanitizeString(data.description) : undefined,
            leader: {
                name: sanitizeString(data.leader.name),
                icon: data.leader.icon,
                trait: {
                    effect: sanitizeString(data.leader.trait.effect)
                }
            },
            historical_info: data.historical_info.map((info: any) => ({
                text: sanitizeString(info.text)
            })),
            icon: data.icon && isValidUrl(data.icon) ? data.icon : undefined
        };
        
        // Validate optional arrays
        if (data.unique_units && Array.isArray(data.unique_units)) {
            validated.unique_units = data.unique_units
                .filter((unit: any) => unit && typeof unit.name === 'string' && typeof unit.url === 'string')
                .map((unit: any) => ({
                    name: sanitizeString(unit.name),
                    url: unit.url,
                    icon: unit.icon && isValidUrl(unit.icon) ? unit.icon : undefined
                }));
        }
        
        if (data.unique_buildings && Array.isArray(data.unique_buildings)) {
            validated.unique_buildings = data.unique_buildings
                .filter((building: any) => building && typeof building.name === 'string' && typeof building.url === 'string')
                .map((building: any) => ({
                    name: sanitizeString(building.name),
                    url: building.url,
                    icon: building.icon && isValidUrl(building.icon) ? building.icon : undefined
                }));
        }
        
        // Validate numeric arrays
        if (data.tags_id && Array.isArray(data.tags_id)) {
            validated.tags_id = data.tags_id.filter((id: any) => typeof id === 'number' && id >= 0);
        }
        
        if (typeof data.tier_id === 'number' && data.tier_id >= 0) {
            validated.tier_id = data.tier_id;
        }
        
        return validated;
    } catch (error) {
        console.error('Validation error:', error);
        return null;
    }
}

// Validate API response
export function validateApiResponse(data: any): ApiCivilization[] | null {
    try {
        if (!Array.isArray(data)) return null;
        
        const validatedData = data
            .map(validateCivilization)
            .filter((civ): civ is ApiCivilization => civ !== null);
        
        return validatedData.length > 0 ? validatedData : null;
    } catch (error) {
        console.error('API response validation error:', error);
        return null;
    }
}

// Validate unit/building data
export function validateUnitData(data: any): ApiUnit | null {
    try {
        if (!data || typeof data !== 'object') return null;
        if (typeof data.name !== 'string' || !data.name.trim()) return null;
        if (typeof data.url !== 'string' || !isValidUrl(data.url)) return null;
        
        return {
            name: sanitizeString(data.name),
            url: data.url,
            icon: data.icon && isValidUrl(data.icon) ? data.icon : undefined
        };
    } catch (error) {
        console.error('Unit validation error:', error);
        return null;
    }
}

export function validateBuildingData(data: any): ApiBuilding | null {
    try {
        if (!data || typeof data !== 'object') return null;
        if (typeof data.name !== 'string' || !data.name.trim()) return null;
        if (typeof data.url !== 'string' || !isValidUrl(data.url)) return null;
        
        return {
            name: sanitizeString(data.name),
            url: data.url,
            icon: data.icon && isValidUrl(data.icon) ? data.icon : undefined
        };
    } catch (error) {
        console.error('Building validation error:', error);
        return null;
    }
}