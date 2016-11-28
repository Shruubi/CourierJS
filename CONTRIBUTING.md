# Contributing to CourierJS

### Reporting Issues

Please use the following template for submitting bugs:

```
[Short description of problem here]

**Reproduction Steps:**

1. [First Step]
2. [Second Step]
3. [Other Steps...]

**Expected behavior:**

[Describe expected behavior here]

**Observed behavior:**

[Describe observed behavior here]
```

### Submitting Patches

Every pull request should include a brief description of the problem you are solving
and why your solution is appropriate. Use the following template to help you

```
[Short description of pull request]

**Why is my solution appropriate**

[describe solution and benefits]
```

No pull request should be submitted with broken, failing or removed tests.

### Contributor Expectations

As a contributor you are expected to treat other users and contributors with respect
and dignity. Any user or contributor found to be harassing, bullying or otherwise mistreating
anyone else will be promptly removed with no chance for appeal.

I do not believe in policing peoples comments outside of the project as every person
should feel free to enter in dialog and stand up for their beliefs. However, any
person associated with the project should be aware that what they say and do can
reflect on the project, and removal from the project will be undertaken if comments
reflect poorly on the project.

### Style Guide

1) braces should always be on the same line as the code

```
// this is good
if(someExpression) {
}

// this is bad
if(someExpression) 
{
}
```

2) use inline exports where-ever possible

```
// this is good
export default class Example {
}

// this is bad
class Example {
}

export default Example;
```

3) use camelCase, class names should be CamelCase. The only exception is constants which should be CONST_CASE

```
// this is good
const SOME_CONSTANT = 3.14;

export default class ExampleClass {
	exampleFunction() {
	}
}

// this is bad
const some_constant = 3.14;

export default class example_class {
	ExampleFunction() {
	}
}
```

4) use `let` and `const`, don't use `var`

```
// this is good
const SOME_CONSTANT = 3.14;
let piSquared = SOME_CONSTANT * SOME_CONSTANT;

// this is bad
var SOME_CONSTANT = 3.14;
var piSquared = SOME_CONSTANT * SOME_CONSTANT;
```

5) use `===` and `!==`, not `==` and `!=`

6) use tabs, not spaces

7) prefer storing the result of a function computation and returning from the function in one place over multiple return paths

```
// this is good
function isEven(value) {
	let isEven = false;
	
	if(value % 2 === 0) {
		isEven = true;
	}
	
	return isEven;
}

// this is bad
function isEven(value) {
	if(value % 2 === 0) {
		return true;
	} else {
		return false;
	}
}
```

8) curly-braces are non-optional

```
// this is good
if(someCondition) {
	console.log('foo bar');
}

// this is bad
if(someCondition)
	console.log('foo bar');
```