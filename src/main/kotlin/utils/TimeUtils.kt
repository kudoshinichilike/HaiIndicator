package utils

import java.util.*

object TimeUtils {
    fun currentTimeSeconds(): Long {
        return System.currentTimeMillis() / 1000
    }

    fun minuteToMillis(minute: Int): Long {
        return minute * 60000L
    }

    fun calcDelayTimeForSchedule (uid:Int, period:Int, millisTime:Long = System.currentTimeMillis()) : Int {
        var delay = period - millisTime % period //tính thời gian delay tới đầu chu kỳ kế
        if (delay < period)
            delay += period //chờ thêm 1 chu kỳ để đảm bảo start đúng giờ
        delay += uid % period //rải đều thời điểm start theo uid để chia tải
        return delay.toInt()
    }

    /***
     * return: millis
     */
    fun getTimeStartOfToday () : Long {
        val calendar = Calendar.getInstance()
        calendar.set(Calendar.HOUR_OF_DAY, 0)
        calendar.set(Calendar.MINUTE, 0)
        calendar.set(Calendar.SECOND, 0)
        calendar.set(Calendar.MILLISECOND, 0)

        return calendar.timeInMillis
    }

    /***
     * return: millis
     */
    fun getTimeStartOfNextDay () : Long {
        val calendar = Calendar.getInstance()
        calendar.add(Calendar.DAY_OF_MONTH, 1)
        calendar.set(Calendar.HOUR_OF_DAY, 0)
        calendar.set(Calendar.MINUTE, 0)
        calendar.set(Calendar.SECOND, 0)
        calendar.set(Calendar.MILLISECOND, 0)

        return calendar.timeInMillis
    }

    fun getTimeStartCurrentHour(): Long {
        val calendar = Calendar.getInstance()
        calendar.set(Calendar.MINUTE, 0)
        calendar.set(Calendar.SECOND, 0)
        calendar.set(Calendar.MILLISECOND, 0)

        return calendar.timeInMillis
    }

    fun getTimeStartHour(hour: Int): Long {
        val calendar = Calendar.getInstance()
        calendar.set(Calendar.HOUR_OF_DAY, hour)
        calendar.set(Calendar.MINUTE, 0)
        calendar.set(Calendar.SECOND, 0)
        calendar.set(Calendar.MILLISECOND, 0)

        return calendar.timeInMillis
    }

    /***
     * return: millis
     */
    fun getTimeNextHour (hour: Int) : Long {
        val calendar = Calendar.getInstance()
        if (System.currentTimeMillis() > getTimeStartHour(hour))
            calendar.add(Calendar.DAY_OF_MONTH, 1)

        calendar.set(Calendar.HOUR_OF_DAY, hour)
        calendar.set(Calendar.MINUTE, 0)
        calendar.set(Calendar.SECOND, 0)
        calendar.set(Calendar.MILLISECOND, 0)

        return calendar.timeInMillis
    }

    fun getDayBefore(numDateBefore: Int) : Long {
        val calendar = Calendar.getInstance()
        calendar.add(Calendar.DAY_OF_MONTH, -numDateBefore)
        return calendar.timeInMillis
    }
}