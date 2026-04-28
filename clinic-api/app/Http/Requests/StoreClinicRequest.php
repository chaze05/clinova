<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreClinicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'clinic_name' => 'required|string|min:2',
            'domain' => 'nullable|string',

            'doctor.enabled' => 'boolean',
            'doctor.name' => 'nullable|string',
            'doctor.email' => 'nullable|email',

            'secretary.enabled' => 'boolean',
            'secretary.name' => 'nullable|string',
            'secretary.email' => 'nullable|email',
        ];
    }
}
