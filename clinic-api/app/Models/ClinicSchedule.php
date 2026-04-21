<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClinicSchedule extends Model
{
    protected $fillable = [
        'clinic_id',
        'type',
        'date',
        'start_time',
        'end_time',
        'reason',
    ];

    /**
     * TYPE HELPERS (optional but useful)
     */
    public const FULL_DAY_OFF = 'full_day_off';
    public const HALF_DAY = 'half_day';
    public const CUSTOM_BLOCK = 'custom_block';

    public function isFullDayOff(): bool
    {
        return $this->type === self::FULL_DAY_OFF;
    }

    public function isHalfDay(): bool
    {
        return $this->type === self::HALF_DAY;
    }

    public function isCustomBlock(): bool
    {
        return $this->type === self::CUSTOM_BLOCK;
    }
}