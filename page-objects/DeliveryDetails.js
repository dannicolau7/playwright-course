import { expect } from "@playwright/test"


export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.getByPlaceholder("First name")
        this.lastNameInput = page.getByPlaceholder("Last name")
        this.streetInput = page.getByPlaceholder("Street")
        this.postCodeInput = page.getByPlaceholder("Post code")
        this.cityInput = page.getByPlaceholder("City")
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddress = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddreslastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')

        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })


            // this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
            // this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
            // this.street = page.locator('[data-qa="delivery-address-street"]')
            // this.postCode = page.locator('[data-qa="delivery-postcode"]')
            // this.city = page.locator('[data-qa="delivery-city"]')
            //this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
    } 

    fillDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userAddress.postCode)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)
        await this.countryDropdown.waitFor()  
        await this.countryDropdown.selectOption(userAddress.country)
        
    }

    saveDetails = async (saveAddress) => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddress.waitFor()
        await this.saveAddress.click()
        await expect (this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        await this.savedAddressFirstName.first().waitFor()
        expect ( await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())

        await this.savedAddreslastName.first().waitFor()
        expect ( await this.savedAddreslastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        await this.savedAddressStreet.first().waitFor()
        expect ( await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.savedAddressPostCode.first().waitFor()
        expect ( await this.savedAddressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue())

        await this.savedAddressCity.first().waitFor()
        expect ( await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        await this.savedAddressCountry.first().waitFor()
        expect ( await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())

    }

    continuePayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
        
     }
}