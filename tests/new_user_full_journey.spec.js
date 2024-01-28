import { test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid"
import { ProductsPage } from "../page-objects/ProductsPage.js"
import { Navigation } from "../page-objects/NavigationPage.js" 
import { Checkout } from "../page-objects/Checkout.js"
import { LoginPage } from "../page-objects/LoginPage.js"
import { RegisterPage } from "../page-objects/RegisterPage.js"
import { DeliveryDetails } from "../page-objects/DeliveryDetails.js"
import { deliveryDetails as userAddress} from "../data/deliveryDetails.js" 
// import { deliveryDetails as saveAddress} from "../data/deliveryDetails.js"
// import { deliveryDetails as  continueToPayment} from "../data/deliveryDetails.js"
import { Payment } from "../page-objects/Payment.js"
import { paymentDetails } from "../data/paymentDetails.js"

test("New user end-to-end test journey", async({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const login = new LoginPage(page)
    await login.moveToSignup()

    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continuePayment()

    const payment = new Payment(page)
    await payment.activateDiscount()
    await payment.fillPaymentDetails(paymentDetails)
    await payment.payButtonItem()
   
})