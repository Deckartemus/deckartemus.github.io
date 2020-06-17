from selenium.webdriver.common.by import By

# Class for main page locators. Anything we want to be locating by (CSS selectors, etc.) goes here.
class MainPageLocators(object):    
    CONNECTION = (By.ID, "btnLogin")

# Class for login page locators   
class LoginPageLocators(object):
    WELCOME = (By.ID, "welcome")
    LOGOUT = (By.LINK_TEXT, "Logout")

