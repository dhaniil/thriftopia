<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Category;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationGroup = 'Katalog';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Produk')->description('Informasi Produk yang akan dijual')
                ->schema([
                    Forms\Components\Grid::make('2')
                     ->schema([
                         Forms\Components\TextInput::make('name')
                             ->maxLength(255)
                             ->required(),
                         Forms\Components\Select::make('category_id')
                             ->label('Kategori')
                             ->options(Category::all()->pluck('name', 'id'))
                             ->required() // Wajib diisi
                             ->searchable()
                     ]),
                    Forms\Components\MarkdownEditor::make('description')
                    ->required(),
                    Forms\Components\Grid::make('2')
                    ->schema([
                        TextInput::make('price')
                            ->label('Harga')
                            ->required()
                            ->prefix('Rp')
                            ->helperText('Masukkan harga tanpa tanda titik/koma. Contoh: 100000 untuk Rp 100.000')
                            ->dehydrated()
                            ->numeric()
                            ->formatStateUsing(fn ($state) => $state ? number_format((int) $state, 0, ',', '.') : null),
                        TextInput::make('stock')
                            ->label('Stok')
                            ->required()
                            ->numeric()
                    ]),
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Produk')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Kategori')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('price')
                    ->label('Harga')
                    ->money('IDR')
                    ->sortable(),

                Tables\Columns\TextColumn::make('stock')
                    ->label('Stok')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->label('Kategori')
                    ->options(function () {
                        return Category::where('is_active', true)
                            ->get()
                            ->pluck('name', 'id');
                    }),

                Tables\Filters\Filter::make('in_stock')
                    ->label('Dalam Stok')
                    ->toggle()
                    ->query(fn (Builder $query): Builder => $query->where('stock', '>', 0)),
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

    public static function getRelations(): array
    {
        return [
            RelationManagers\ImagesRelationManager::class,
            RelationManagers\AttributeValuesRelationManager::class,
            RelationManagers\ReviewsRelationManager::class,
            RelationManagers\VariantsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
