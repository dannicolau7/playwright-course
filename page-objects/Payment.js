import { expect } from "@playwright/test"
import { paymentDetails } from "../data/paymentDetails"

export class Payment {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.submitDiscountButton = page.getByRole('button', { name: 'Submit discount' })

        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')

        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumberInput= page.locator('[data-qa="credit-card-number"]')
        this.validUntilInput = page.locator('[data-qa="valid-until"]')
        this.creditCardCvcInput = page.locator('[data-qa="credit-card-cvc"]')

        this.payButton = page.locator('[data-qa="pay-button"]')
        
    }



activateDiscount = async () => {
    await this.discountCode.waitFor()
    const code = await this.discountCode.innerText()
    await this.discountInput.waitFor()
    //Option 1
    await this.discountInput.fill(code)
    await expect(this.discountInput).toHaveValue(code)
    await this.submitDiscountButton.waitFor()
    await this.submitDiscountButton.click()

    //Option 2
    // await this.discountInput.focus()
    // await this.page.keyboard.type(code, {delay: 1000})
    // expect(await this.discountInput.inputValue()).toBe(code)
    expect(await this.discountValue.isVisible()).toBe(false)
    expect(await this.discountActiveMessage.isVisible()).toBe(false)

    await this.discountActiveMessage.waitFor()
    await this.discountValue.waitFor()
    const discountValueText = await this.discountValue.innerText()
    const discountValueOnlyStringNumber = discountValueText.replace("$","")
    const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

    await this.totalValue.waitFor()
    const totalValueText = await this.totalValue.innerText()
    const totalValueOnlyStringNumber = totalValueText.replace("$","")
    const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)

    expect(discountValueNumber).toBeLessThan(totalValueNumber)


} 

fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwnerInput.waitFor()
    await this.creditCardOwnerInput.fill(paymentDetails.owner)

    await this.creditCardNumberInput.waitFor()
    await this.creditCardNumberInput.fill(paymentDetails.number)

    await this.validUntilInput.waitFor()
    await this.validUntilInput.fill(paymentDetails.validUntil)

    await this.creditCardCvcInput.waitFor()
    await this.creditCardCvcInput.fill(paymentDetails.cvc)
    
}

payButtonItem = async () => {
    await this.payButton.waitFor()
    await this.payButton.click()
    await this.page.waitForURL(/\/thank-you/, {timeout: 3000})

}

}


