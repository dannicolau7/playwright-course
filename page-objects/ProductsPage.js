import { expect } from "@playwright/test"
import { Navigation } from "./NavigationPage.js"
import { isDesktopViewport } from "../utils/isdesktopViewport.js"

export class ProductsPage {
    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async() => {
        await this.page.goto("/")
    }

    
    addProductToBasket = async(index) => {
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)

        let basketCounterBeforeAdding
        if (isDesktopViewport(this.page)) {
            basketCounterBeforeAdding = await navigation.getBasketCount()

        }

        
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        if (isDesktopViewport(this.page)) {
        const basketCounterAfterAdding = await navigation.getBasketCount()
        expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
        }
    }

    sortByCheapest = async() => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)

    }
}