export const FIXED_ROUTE_PRICES = {
    'Amsterdam Airport Schiphol': {
        'Rotterdam': {
            'taxi': 77.50,    // 4 passengers max
            'taxivan': 107.50  // 8 passengers max
        },
        'Schiedam': {
            'taxi': 77.50,
            'taxivan': 107.50
        },
        'Vlaardingen': {
            'taxi': 77.50,
            'taxivan': 107.50
        }
    },
    'Eindhoven Airport': {
        'Rotterdam': {
            'taxi': 150,
            'taxivan': 175
        },
        'Schiedam': {
            'taxi': 150,
            'taxivan': 175
        }
    }
}

export const VEHICLES = {
    taxi: {
        name: 'Comfort Taxi',
        capacity: 4,
        description: 'Comfortable sedan for up to 4 passengers',
        image: '/taxi.png'
    },
    taxivan: {
        name: 'Taxi Van',
        capacity: 8,
        description: 'Spacious van for up to 8 passengers',
        image: '/taxivan.png'
    }
}
