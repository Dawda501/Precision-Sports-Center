const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-black/50 backdrop-blur border-t border-border z-40">
      <div className="container mx-auto py-4 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Precision Sports. All rights reserved.
        </p>

        <div className="flex gap-4 mt-3 sm:mt-0">
          <a
            href="https://www.snapchat.com/add/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-transform transform hover:scale-110"
            aria-label="Snapchat"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/snapchat.svg"
              alt="Snapchat"
              className="h-5 w-5 opacity-80 hover:opacity-100"
            />
          </a>
          <a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-transform transform hover:scale-110"
            aria-label="Facebook"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
              alt="Facebook"
              className="h-5 w-5 opacity-80 hover:opacity-100"
            />
          </a>
          <a
            href="https://www.instagram.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-transform transform hover:scale-110"
            aria-label="Instagram"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
              alt="Instagram"
              className="h-5 w-5 opacity-80 hover:opacity-100"
            />
          </a>
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-transform transform hover:scale-110"
            aria-label="Twitter"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg"
              alt="Twitter"
              className="h-5 w-5 opacity-80 hover:opacity-100"
            />
          </a>
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-transform transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
              alt="WhatsApp"
              className="h-5 w-5 opacity-80 hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
