import unittest
from selenium import webdriver
import time
import page

# Test class. 
class Login(unittest.TestCase):
    
    def setUp(self):
        self.driver = webdriver.Chrome("C:/Program Files (x86)/chromedriver.exe")
        self.driver.get("https://opensource-demo.orangehrmlive.com/")
        self.driver.maximize_window()

    # Tests login and logout from the service. First it provides credentials, then logs in, then logs out.
    def test_login(self):
        # Loads the page
        mainPage = page.MainPage(self.driver)
        # Checks for the word Orange in the page title
        assert mainPage.is_title_matches()        
        # Provides login
        mainPage.login_element = "Admin"
        # Provides password
        mainPage.password_element = "admin123"        
        # Clicks on the login
        mainPage.click_login()
        time.sleep(3)
        # Clicks on the dropdown menu
        loginPage = page.LoginPage(self.driver)
        loginPage.click_welcome()
        time.sleep(3)
        # Clicks on the logout
        loginPage.click_logout()
        time.sleep(3)

    def tearDown(self):
        self.driver.close()     
      
if __name__ == "__main__":
    unittest.main()