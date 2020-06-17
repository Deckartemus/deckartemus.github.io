from locator import *
from element import BasePageElement

# Login class for Login element on the page
class Login(BasePageElement):
    locator = "txtUsername"

# Password class for Password element on the page
class Password(BasePageElement):
    locator = "txtPassword"

# Base page class
class BasePage(object):
    def __init__(self, driver):
        self.driver = driver

# Main page class inheriting from base page
class MainPage(BasePage):

    # Main page methods

    # descriptors 
    login_element = Login()
    password_element = Password()

    # Verifies that hardcoded text appears in the page title
    def is_title_matches(self):
        return "Orange" in self.driver.title

    # Login to the service
    def click_login(self):
        element = self.driver.find_element(*MainPageLocators.CONNECTION)
        element.click()

# Login page class inheriting from the base page
class LoginPage(BasePage):
    
    # Click on the admin dropdown
    def click_welcome(self):
        element = self.driver.find_element(*LoginPageLocators.WELCOME)
        element.click()

    # Logout from the service
    def click_logout(self):
        element = self.driver.find_element(*LoginPageLocators.LOGOUT)
        element.click()

    
