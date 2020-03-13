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
        edit_button: 'Update',
        details_button: 'Details',
        new_owner_button: 'New Owner',
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
        edit_button: 'Actualizar',
        details_button: 'Detalles',
        new_owner_button: 'Nuevo Dueño',
    },
    fr: {
        fields: {
            first_name: 'Prénom',
            last_name: 'Nom de famille',
            address: 'Adresse de rue',
            city: 'Ville',
            state: 'Etat',
            telephone: 'Téléphone',
        },
        errors: {
            first_name: 'Le prénom est requis',
            last_name: 'Le nom de famille est obligatorie',
            address: 'L\'adresse de la rue est nécessaire',
            city: 'La ville est obligatorie',
            state: 'L\'État doit être présent',
            telephone: 'Le numéro de téléphone est requis',
        },
        title: 'Créer un nouveau propriétaire d\'animal de compagnie ...',
        address_heading: 'Adresse du domicile',
        add_button: 'Ajouter',
        cancel_button: 'Annuler',
        edit_button: 'Reviser',
        details_button: 'Détails',
        new_owner_button: 'Nouvelle cliente',
    }
}

export { data }