export default function UserInfo() {
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zinc-300/10 flex
            flex-col gap-2 my-6">
                <div>
                    First Name: <span className="font-bold">John</span>
                </div>

                <div>
                    Last Name: <span className="font-bold">Smith</span>
                </div>

                <div>
                    Username: <span className="font-bold">jSmith</span>
                </div>

                <button className="bg-red-500 text-white
                fon-bold px-6 py-2 mt-3">Log Out</button>
            </div>
        </div>

    );
}