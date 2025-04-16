<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use App\Models\Attribute;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class AttributeValuesRelationManager extends RelationManager
{
    protected static string $relationship = 'attributeValues';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('attribute_id')
                    ->label('Atribut')
                    ->options(function () {
                        return Attribute::all()->pluck('name', 'id');
                    })
                    ->required()
                    ->searchable(),

                Forms\Components\TextInput::make('value')
                    ->label('Nilai')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('attribute.name')
                    ->label('Atribut')
                    ->sortable(),

                Tables\Columns\TextColumn::make('value')
                    ->label('Nilai')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
