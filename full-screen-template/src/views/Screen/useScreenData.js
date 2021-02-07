import { onMounted, onUnmounted, ref } from 'vue'
import { getUserData } from '../../api'

let task = null

function getNowTime() {
    const now = new Date()
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}

const createData = async ({ userData }, context) => {
    userData.value = await getUserData()
}

const screenReady = ({ ready, userData }, context, { once }) => {
    setTimeout(async () => {
        ready.value = true
        await createData(
            {
                userData
            },
            context
        )
    }, 1000)
    if (!once) {
        task = setInterval(async () => {
            await createData(
                {
                    userData
                },
                context
            )
        }, 5000)
    }
}

const killTask = () => {
    if (task) {
        clearInterval(task)
    }
}

export function useScreenData(context, { once }) {
    const ready = ref(false)
    const userData = ref({
        today: 0,
        averageAge: 0
    })

    onMounted(() =>
        screenReady(
            {
                ready,
                userData
            },
            context,
            { once }
        )
    )
    onUnmounted(killTask)

    return {
        ready,
        userData
    }
}
