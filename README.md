## Answers

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: getElementById is used to select a specific element by its id. Since an id should be unique, it always returns a single element.

getElementsByClassName is used to select multiple elements that share the same class name. It returns an HTMLCollection.

querySelector uses a CSS selector and returns the first matching element. querySelectorAll returns all matching elements as a NodeList.

### 2. How do you create and insert a new element into the DOM?

Ans: We create a new element using createElement(). Then we add content and insert it into the DOM using appendChild().

### 3. What is Event Bubbling? And how does it work?

Ans: Event Bubbling is a process where an event starts from the target element and then moves upward to its parent elements step by step. It continues up to the document level unless stopped.

### 4. What is Event Delegation in JavaScript? Why is it useful?

Ans:Event Delegation is a technique where we attach an event listener to a parent element instead of adding separate listeners to each child. It works using event bubbling. It is useful because it reduces code and also works for dynamically created elements.

### 5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: preventDefault() stops the default action.
stopPropagation() stops the event from moving to parent elements.