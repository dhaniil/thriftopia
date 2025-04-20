<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Filament\Resources\CategoryResource\RelationManagers;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;

    protected static ?string $navigationIcon = 'heroicon-o-folder';

    protected static ?string $navigationGroup = 'Kategori';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(2)
                ->schema([
                    Forms\Components\Group::make()
                        ->schema([
                        Forms\Components\Section::make("Informasi Kategori")
                        ->description('Masukkan Informasi Kategori.')

                        ->schema([
                            Forms\Components\TextInput::make('name')
                                ->label('Nama Kategori')
                                ->required()
                                ->live(onBlur: true) // biar slug bisa auto-generate
                                ->afterStateUpdated(fn ($state, callable $set) => 
                                    $set('slug', \Str::slug($state))
                            ),
                            Forms\Components\TextInput::make('slug')
                                ->required()
                                ->unique(ignoreRecord: true),

                            Forms\Components\Select::make('parent_id')
                                ->label('Parent Kategori')
                                ->options(Category::whereNull('parent_id')->pluck('name', 'id'))
                                ->searchable()
                                ->nullable(),
                            Forms\Components\Card::make('Status Kategori')
                                ->schema([
                                    Forms\Components\Toggle::make('is_active')
                                        ->label('Aktif')
                                        ->default(true),
                                ]),
                    ]),
                    
                ]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Card::make()
                            ->schema([
                            Forms\Components\FileUpload::make('image')
                                ->label('Gambar')
                                ->image()
                                ->required()
                                ->directory('category-images')
                                ->nullable(),
                            ]),
                    ]),
            ]),

                
                    
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('slug'),
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                // Tables\Columns\TextColumn::make('created_at')
                //     ->dateTime(),
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
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
