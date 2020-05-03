
var givenName = 'Carmen'
var familyName = 'San Diego'

describe('Create patient', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Successful patient creation following allergy, diagnosis and notes addition', () => {
        var id = '';
        var allergy = 'Being a bitch'
        var diagnoses = 'Pro thief'
        var note = 'She likes to dress red clothes'

        cy.get('.nav').contains('Pacientes').click()
        cy.get('.nav-item').contains('Novo Paciente').click()

        cy.get('#prefixTextInput').type('Sra')
        cy.get('#givenNameTextInput').type(givenName)
        cy.get('#familyNameTextInput').type(familyName)
        cy.get('#suffixTextInput').type('.')
        cy.get('[data-cy=sex]').find('.form-control').select('Feminino')
        cy.get('[data-cy=type]').find('.form-control').select('Particular')
        cy.get('[data-cy=dateOfBirth]').find('.form-control').type("05/01/2020\n")
        cy.get('#occupationTextInput').type('Nômade Digital')
        cy.get('#preferredLanguageTextInput').type('Espanhol')
        cy.get('#phoneNumberTextInput').type('123456789')
        cy.get('#emailTextInput').type('carmen@sandiego.com')
        cy.get('[data-cy=address]').find('.form-control').type('carmen@sandiego.com')

        cy.get('[data-cy=save-btn]').click()

        cy.get('[data-cy=patientName]').should('contain', givenName + ' ' + familyName)
        cy.get('[data-cy=patientName]').invoke('text').then((text) => {
            id = text.split('(')[1].split(')')[0]

            cy.get('.nav-item').contains('Lista de pacientes').click()
            cy.get('[data-cy=patientId]').should('contain', id)
            cy.get('[data-cy=patientId]').contains(id).click()
        })

        cy.get('button').contains('Alergias').click()
        cy.get('[data-cy=add-allergy]').find('button').click()
        cy.get('#nameTextInput').type(allergy)
        cy.get('.btn-success').click()
        cy.get('.list-group-item').should('contain', allergy)

        cy.get('button').contains('Diagnósticos').click()
        cy.get('[data-cy=add-diagnoses]').find('button').click()
        cy.get('#nameTextInput').type(diagnoses)
        cy.get('.btn-success').click()
        cy.get('.list-group-item').should('contain', diagnoses)

        cy.get('button').contains('Notas').click()
        cy.get('[data-cy=add-note]').find('button').click()
        cy.get('[data-cy=noteTextField]').find('textarea').type(note)
        cy.get('.btn-success').click()
        cy.get('.list-group-item').should('contain', note)
    })
})