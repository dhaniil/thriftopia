<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';
    protected static ?string $navigationGroup = 'Lainnya';
    protected static ?int $navigationSort = 90;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
            Forms\Components\Grid::make(2)
                ->schema([
                    Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Informasi Pengguna')
                            ->description('Masukkan Informasi Pengguna.')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->label('Nama')
                                    ->prefixIcon('heroicon-o-user')
                                    ->required(),
                                Forms\Components\TextInput::make('email')
                                    ->label('Email')
                                    ->prefixIcon('heroicon-o-envelope')
                                    ->email()
                                    ->required(),
                                Forms\Components\TextInput::make('password')
                                    ->label('Password')
                                    ->prefixIcon('heroicon-o-lock-closed')
                                    ->password()
                                    ->required(fn ($livewire) => $livewire instanceof Pages\CreateUser) // Password hanya required saat create
                                    ->dehydrated(fn ($state) => filled($state)) // Hanya update password jika diisi
                                    ->dehydrateStateUsing(fn ($state) => Hash::make($state)),                            ]),

                    ]),

                    Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\card::make('Avatar')
                        ->schema([
                            Forms\Components\FileUpload::make('avatar')
                                ->label(false)
                                ->image ()
                                ->directory('avatars'),
                        ]),
                    ]),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('avatar')
                    ->label('Avatar')
                    ->size(50)
                    ->circular(),
                    
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('email')->searchable(),

            ])->filters([
                //
            ])->headerActions([

            ])->actions([
                //
            ])->bulkActions([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
