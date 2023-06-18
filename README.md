## Concepts
TODO Describe field states and how they change

## Creating a Form
The root node for a form is the `Form` component, which acts as the controller for the elements within the form.

```tsx
export function Example(): React.ReactElement {
	return (
		<Form>
			...
		</Form>
	);
}
```

You can use a `Form` like a normal HTML form via the `method` and `action` attributes, or you can hook the submit event
using the `onSubmit` attribute. Note that using `onSubmit` does not cancel the `submit` event for you; if you want 
to stop the HTML form from submitting, you'll need to cancel the event yourself.

### HTML Style
This style of `Form` will submit like a normal HTML form. Note that no additional steps are taken to ensure that all 
required fields have been filled out. You'll likely want to combine this style with the `required` and `pattern` 
attributes on your inputs.

Much like a standard HTML form, this style `Form` will only submit through normal HTML mechanisms, such as a 
`button` with the `type="submit"` attribute.

This style is useful when you have a simple form that can submit its data as a `GET` or `POST` request to another 
URL. It behaves most like a normal HTML form would behave.

```tsx
export function HtmlStyleExample(): React.ReactElement {
	return (
		<Form action="https://example.com" method="get">
			...
		</Form>
	);
}
```

### Callback Style
This style of `Form` will trigger the `onSubmit` callback when the last field of the form enters the `Valid` state. 
Note that the callback may or may not include a `React.FormEvent`, depending on how the `submit` event was triggered.
If the event came from a `button` or `input` with the `type="submit"` attribute, then the event will be included.

It is highly recommended that you always include a `event?.preventDefault()` call at the top of your event handler 
in the callback style, as the `action` and `method` attributes may not be defined on the HTML `form` element.

This style is useful when you need to submit collected form data through an API without actually submitting the form.

```tsx
export function CallbackStyleExample(): React.ReactElement {
	const onSubmit = React.useCallback((event?: React.FormEvent) => {
		event?.preventDefault();
		fetch('https://example.com?field=123');
	}, []);

	return (
		<Form onSubmit={onSubmit}>
			...
		</Form>
	);
}
```

### Mixed Style
This style of `Form` combines both the [HTML style](#html-style) and [callback style](#callback-style) behaviors. It 
can safely trigger via a `button` or `input` with a `type="submit"` attribute, but it will also trigger the callback 
passed to `onSubmit` in both cases covered by the other two form styles. This is the most verbose of the two styles, 
but will ensure that no matter how the form is submitted, you're able to completely control the outcome.

This form is useful when you need to submit the form via `GET` or `POST` to another URL, but also have some 
pre-submission logic that you need to run.

```tsx
export function MixedStyleExample(): React.ReactElement {
	const onSubmit = React.useCallback(() => console.log('The form is being submitted...'), []);

	return (
		<Form action="https://example.com" method="get" onSubmit={onSubmit}>
			...
		</Form>
	);
}
```
