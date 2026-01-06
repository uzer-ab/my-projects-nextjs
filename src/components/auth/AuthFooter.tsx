import Link from "next/link";

type AuthFooterProps = {
    text: string;
    linkText: string;
    linkHref: string;
};

export function AuthFooter({ text, linkText, linkHref }: AuthFooterProps) {
    return (
        <p className="text-center text-sm text-muted-foreground">
            {text}{' '}
            <Link
                href={linkHref}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
                {linkText}
            </Link>
        </p>
    );
}
