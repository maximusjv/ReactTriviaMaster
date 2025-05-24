import type {AnswerRecord} from "@components/Results";

interface RecordCardProps {
    record: AnswerRecord;
}

const RecordCard: React.FC<RecordCardProps> = ({record}) => {
    const isCorrect = record.question.correct_answer === record.answer;

    const cardBgClass = isCorrect ? 'bg-green-50' : 'bg-red-50';
    const headerTextColorClass = isCorrect ? 'text-green-800' : 'text-red-800';
    const borderColorClass = isCorrect ? 'border-green-300' : 'border-red-300';

    return (
        <div
            className={`
                flex flex-col text-start w-full p-4 mb-6
                rounded-xl shadow-lg transition-all duration-300 ease-in-out
                border-l-8 ${borderColorClass} ${cardBgClass}
                hover:shadow-2xl
            `}
        >
            <h1 className={`text-xl font-extrabold mb-3 ${headerTextColorClass}`}>
                {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
            </h1>

            <div className="flex flex-col justify-evenly w-full space-y-2 text-gray-700">
                <p className="text-wrap text-start">
                    <span className="font-semibold text-gray-900">Question:</span> {record.question.question}
                </p>
                <p className="text-wrap text-start">
                    <span className="font-semibold text-gray-900">Category:</span> {record.question.category.name}
                </p>
                <p className="text-wrap text-start">
                    <span className="font-semibold text-gray-900">Difficulty:</span> <span
                    className="capitalize">{record.question.difficulty}</span>
                </p>
                <p className="text-wrap text-start">
                    <span className="font-semibold text-gray-900">Correct Answer:</span> <span
                    className="font-medium">{record.question.correct_answer}</span>
                </p>
                {!isCorrect && (
                    <p className="text-wrap text-start text-red-600">
                        <span className="font-semibold text-red-700">Your Answer:</span> <span
                        className="font-medium">{record.answer}</span>
                    </p>
                )}
            </div>
        </div>
    );
};


export default RecordCard;

