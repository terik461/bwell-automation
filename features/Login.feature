Feature: Bwell Automation QA Task
  As a QA who is intrested in Bwell
  I want to solve interview task
  So that I can be confident if I get invited to a meeting

  Scenario: The user can Sign in with valid credentials
    Given I am on 'http:/login.myappcms.com/' homepage
    When I type 'CMS Demo Account' as App Name
    And I type 'demo@Diyappdesigner.com' as Email Address
    And I type 'demo123' as Password
    And I click on Sign in button
    Then I should see my dashboard

  Scenario: The user can sort in ascending order all Appointments services by name
  	Given I am on 'http://login.myappcms.com/build' page
  	When I click appointments services should appear on the dropdown
    And I click services 'Services' should appear
    And I click sort ascending on service name column
  	Then I should see correct results list

  Scenario: The user can search all Appointments services by name
  	Given I am on 'http://login.myappcms.com/build' home page
  	When I type colour in 'search box'
  	Then I should see correct results list