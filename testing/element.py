from selenium.webdriver.support.ui import WebDriverWait

# Base page class that is initialized on every page object class. We create methods here so we can access them for any elements we want.
class BasePageElement(object):
    # Setting the value of the object
    def __set__(self, obj, value):
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element_by_name(self.locator))
        driver.find_element_by_name(self.locator).clear()
        driver.find_element_by_name(self.locator).send_keys(value)
    
    # Getting the value of the object
    def __get__(self, obj, owner):
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element_by_name(self.locator))
        element = driver.find_element_by_name(self.locator)
        return element.get_attribute("value")
