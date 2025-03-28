# Button Component

We should use the semantic tags in HTML for the "SEO" perspective and "accessibility"
so <a/> tag is used for the navigation
<button/> tag is used for the action perform

it is a bad practice to navigate to different page using the onClick bcoz google crawler cant read that it is a link

so the solution is polymorphic component

you have to create a button component
-> which will handle the action perform using the onCLick <button/>
-> which will handle the outside links <a/>
-> which will handle the internal links <Link/> tag so that it does not reload the page again

-> tailwind-merge is for the managing the class conflicts.
for ex. px-1 py-3 p-3 // i want the p-3 to be run , className={teMerge(extra_class,className)}

<Button 
    isLoading
    isIcon
    isLink> // this button is handling three types of buttons -> link buttons, icon button , loading buttons

// pointer-events-none -> helps you to disable the button for on click and the stop propogation it will disable the hover style

<!-- Problems -->

1:) in ripple effect there is a problem of the
-> when i hover on the button it shows the hover class of the button but when i click the button the span tag comes as a overlay to the button so now hover class of button will not shows
-> solution to this problem may be use pseudo elements for the ripple effect,
-> in adding a span children it creates a extra overlay
