"use client"
type DownloadButtonProps = {
    title: string,
    resumeLink: string,
    resumeDownloadName: string
}

export function DownloadButton(props: DownloadButtonProps) {
    const { title, resumeLink, resumeDownloadName } = props;
    return (
        <button onClick={() => {
            const link = document.createElement('a')
            link.href = resumeLink
            link.download = resumeDownloadName
            link.click()
        }} className="inline-flex hover:cursor-pointer items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
            aria-label={`${title}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-download h-4 w-4"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            {title}
        </button>
    )
}