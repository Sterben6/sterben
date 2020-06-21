const main = (<div>
    <meta charSet="UTF-8" />
    <link rel="stylesheet" href="../static.css" />
    <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="../../img/apple-touch-icon.png"
    />
    <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../../img/favicon-32x32.png"
    />
    <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../../img/favicon-16x16.png"
    />
    <link rel="manifest" href="../../img/site.webmanifest" />
    <title>Judge Advocate General Corps Home</title>
    <div>
        <h1> Judge Advocate General Corps</h1>
        <h2> Home </h2>
    </div>
    <ul>
        <li id="HomeButton">
            <a>Home</a>
        </li>
        <li id="CasesButton">
            <a>Cases</a>
        </li>
        <li id="ApplyButton">
            <a>Apply</a>
        </li>
        <li id="TeamButton">
            <a>Team</a>
        </li>
    </ul>
</div>);

ReactDOM.render(main, document.getElementById('root'))
