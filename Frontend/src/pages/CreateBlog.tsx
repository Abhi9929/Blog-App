import Header from "../components/write/Header"
import TextBox from "../components/write/TextBox"

function CreateBlog() {
    return (
        <>
            <Header />
            <div className="w-full mt-20">
                <div className="max-w-6xl mx-auto px-4 md:px-0 text-center">
                    <div className="w-full flex gap-2">
                        <TextBox />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateBlog