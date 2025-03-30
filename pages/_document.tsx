import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';


class NewDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" />
					<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

				</Head>
				<body>

					<Main />
					<NextScript />
					<noscript
					    dangerouslySetInnerHTML={{
					      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX" height="0" width="0" style="display: none; visibility: hidden;" />`,
					    }}
					  />
				</body>
			</Html>
		);
	}
}

export default NewDocument;
