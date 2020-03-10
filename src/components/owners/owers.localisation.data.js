const data = {
    en: {
        fields: {
            first_name: 'First name',
            last_name: 'Last name',
            address: 'Street Address',
            city: 'City',
            state: 'State',
            telephone: 'Telephone'
        },
        errors: {
            first_name: 'First name must be present',
            last_name: 'Last name is required',
            address: 'Street Address is required',
            city: 'City name is required',
            state: 'Please enter the state',
            telephone: 'Telephone number must be present',
        },
        title: 'Create A New Pet Owner ...',
        address_heading: 'Home Address',
        add_button: 'Add owner',
        cancel_button: 'Cancel',
    },
    es: {
        fields: {
            first_name: 'Nombre',
            last_name: 'Apellido',
            address: 'Domicilio',
            city: 'Ciudad',
            state: 'Estado',
            telephone: 'El número de teléfono',
        },
        errors: {
            first_name: 'El nombre debe tener un valor',
            last_name: 'El apellido es obligatorio',
            address: 'Domicilio es obligatorio',
            city: 'Se requiere el nombre de la ciudad',
            state: 'Por favor ingrese el estado',
            telephone: 'El número de teléfono debe estar presente.',
        },
        title: 'Crear un nuevo dueño de mascota ...',
        address_heading: 'Dirección completa',
        add_button: 'Añadir',
        cancel_button: 'Cancelar',
    }
}

export { data }